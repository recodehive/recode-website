const SUBSTACK_FREE_ENDPOINT =
  "https://recodehive.substack.com/api/v1/free?nojs=true";

/**
 * Subscribes an email to the recode hive Substack.
 *
 * Substack's endpoint has no CORS headers, so a fetch() cannot read the
 * result. Posting a plain form (the same way Substack's own embed does)
 * opens Substack's confirmation page in a new tab, which handles the
 * double opt-in email and any captcha.
 */
export function subscribeToSubstack(email: string): void {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = SUBSTACK_FREE_ENDPOINT;
  form.target = "_blank";
  form.style.display = "none";

  const fields: Record<string, string> = {
    email,
    source: "recodehive.com",
    first_url: window.location.href,
  };
  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
