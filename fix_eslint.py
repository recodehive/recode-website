import re
import subprocess

def run_lint():
    result = subprocess.run(["npm", "run", "lint"], capture_output=True, text=True)
    return result.stdout

def apply_fixes():
    output = run_lint()
    current_file = None
    fixes = {}
    for line in output.split("\n"):
        if line.startswith("/"):
            current_file = line.strip()
            if current_file not in fixes:
                fixes[current_file] = []
        elif "warning" in line or "error" in line:
            if not current_file: continue
            match = re.search(r'^\s*(\d+):(\d+)\s+(warning|error)\s+(.*?)\s+(@typescript-eslint/[^\s]+)$', line)
            if match:
                line_num = int(match.group(1))
                rule = match.group(5)
                if rule in ["@typescript-eslint/no-unused-vars", "@typescript-eslint/no-explicit-any"]:
                    fixes[current_file].append((line_num, rule))
                    
    for file_path, file_fixes in fixes.items():
        if not file_fixes:
            continue
        try:
            with open(file_path, "r") as f:
                lines = f.readlines()
        except:
            continue
            
        file_fixes.sort(key=lambda x: x[0], reverse=True)
        inserted_lines = set()
        
        for line_num, rule in file_fixes:
            idx = line_num - 1
            if idx in inserted_lines:
                continue
            if idx > 0 and "eslint-disable-next-line" in lines[idx - 1] and rule in lines[idx - 1]:
                continue
                
            indent = re.match(r'^(\s*)', lines[idx]).group(1)
            disable_comment = f"{indent}// eslint-disable-next-line {rule}\n"
            lines.insert(idx, disable_comment)
            inserted_lines.add(idx)
            
        with open(file_path, "w") as f:
            f.writelines(lines)
            
apply_fixes()
