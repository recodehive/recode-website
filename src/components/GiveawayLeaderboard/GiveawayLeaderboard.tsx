import { GiveawayEntry } from "@site/src/pages/dashboard/giveaway";
import { motion } from "framer-motion";
import { Award, Crown, Star } from "lucide-react";
import { useEffect, useState } from "react";

const GiveawayLeaderboard = () => {

    const [leaderboard, setLeaderboard] = useState<GiveawayEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching leaderboard data
        const fetchLeaderboard = async () => {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockData: GiveawayEntry[] = [
                {
                    rank: 1,
                    name: "sanjay-kv",
                    avatar: "https://avatars.githubusercontent.com/u/30715153?v=4",
                    points: 2500,
                    contributions: 45,
                    github_url: "https://github.com/sanjay-kv",
                    badge: "🏆 Champion"
                },
                {
                    rank: 2,
                    name: "vansh-codes",
                    avatar: "https://avatars.githubusercontent.com/u/114163734?v=4",
                    points: 2100,
                    contributions: 38,
                    github_url: "https://github.com/vansh-codes",
                    badge: "🥈 Runner-up"
                },
                {
                    rank: 3,
                    name: "Hemu21",
                    avatar: "https://avatars.githubusercontent.com/u/106808387?v=4",
                    points: 1850,
                    contributions: 32,
                    github_url: "https://github.com/Hemu21",
                    badge: "🥉 Third Place"
                }
            ];

            setLeaderboard(mockData);
            setLoading(false);
        };

        fetchLeaderboard();
    }, []);

    return (
        <motion.section
            className="giveaway-leaderboard-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <div className="giveaway-leaderboard-header">
                <h2 className="giveaway-leaderboard-title">
                    🎁 Giveaway <span className="highlight">Leaderboard</span>
                </h2>
                <p className="giveaway-leaderboard-subtitle">
                    Top contributors competing for amazing prizes!
                </p>
            </div>

            {loading ? (
                <div className="giveaway-loading">
                    <div className="loading-spinner">Loading...</div>
                    <p>Fetching leaderboard data...</p>
                </div>
            ) : (
                <div className="giveaway-leaderboard-grid">
                    {leaderboard.map((entry, index) => (
                        <motion.div
                            key={entry.rank}
                            className={`giveaway-leaderboard-card rank-${entry.rank <= 3 ? entry.rank : 'other'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                        >
                            <div className="giveaway-rank-badge">
                                {entry.rank <= 3 ? (
                                    entry.rank === 1 ? <Crown size={20} /> :
                                        entry.rank === 2 ? <Award size={20} /> :
                                            <Star size={20} />
                                ) : (
                                    `#${entry.rank}`
                                )}
                            </div>

                            <div className="giveaway-avatar">
                                <img src={entry.avatar} alt={entry.name} />
                                {entry.badge && (
                                    <div className="giveaway-badge">{entry.badge}</div>
                                )}
                            </div>

                            <div className="giveaway-info">
                                <h3 className="giveaway-name">{entry.name}</h3>
                                <div className="giveaway-stats">
                                    <div className="giveaway-stat">
                                        <span className="stat-value">{entry.points}</span>
                                        <span className="stat-label">Points</span>
                                    </div>
                                    <div className="giveaway-stat">
                                        <span className="stat-value">{entry.contributions}</span>
                                        <span className="stat-label">Contributions</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={entry.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="giveaway-profile-btn"
                            >
                                View Profile
                            </a>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.section>
    );
}

export default GiveawayLeaderboard