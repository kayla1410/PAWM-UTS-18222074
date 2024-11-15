import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import'./Savedprogress.css'

const SavedProgress = () => {
    const [bidangMiringData, setBidangMiringData] = useState<any[]>([]);
    const [jungkatJungkitData, setJungkatJungkitData] = useState<any[]>([]);
    const [selectedSimulation, setSelectedSimulation] = useState<any>(null); // Menyimpan simulasi yang dipilih
    const [loading, setLoading] = useState(true);

    const fetchSavedProgress = async () => {
        try {
            const { data: userData, error } = await supabase.auth.getUser();
    
            if (error) {
                console.error("Error fetching user:", error.message);
                return;
            }
    
            if (userData?.user) {
                // Ambil data Bidang Miring
                const { data: bidangMiring, error: bidangMiringError } = await supabase
                    .from('plane_simulations')
                    .select('*')
                    .eq('user_id', userData.user.id);
    
                if (bidangMiringError) throw bidangMiringError;
                setBidangMiringData(bidangMiring || []);
    
                // Ambil data Jungkat Jungkit
                const { data: jungkatJungkit, error: jungkatJungkitError } = await supabase
                    .from('simulations')
                    .select('*')
                    .eq('user_id', userData.user.id)
                    .eq('type', 'Jungkat Jungkit');
    
                if (jungkatJungkitError) throw jungkatJungkitError;
                setJungkatJungkitData(jungkatJungkit || []);
            }
        } catch (error) {
            console.error('Error fetching saved progress:', error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchSavedProgress();
    }, []);

    const handleSimulationClick = (simulation: any) => {
        setSelectedSimulation(simulation); // Menyimpan simulasi yang dipilih
    };

    return (
        <div className="saved-progress">
            <h2>Saved Simulations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="simulation-category">
                        <h3>Bidang Miring</h3>
                        <div className="simulation-list">
                            {bidangMiringData.map((sim, index) => (
                                <div
                                    key={sim.id}
                                    className="simulation-item"
                                    onClick={() => handleSimulationClick(sim)}
                                >
                                    Simulation {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="simulation-category">
                        <h3>Jungkat Jungkit</h3>
                        <div className="simulation-list">
                            {jungkatJungkitData.map((sim, index) => (
                                <div
                                    key={sim.id}
                                    className="simulation-item"
                                    onClick={() => handleSimulationClick(sim)}
                                >
                                    Simulation {index + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bagian untuk menampilkan detail simulasi yang dipilih */}
                    {selectedSimulation && (
                        <div className="simulation-details">
                            <h3>Simulation Details</h3>
                            <p><strong>Parameters:</strong> {JSON.stringify(selectedSimulation.parameters)}</p>
                            <p><strong>Results:</strong> {JSON.stringify(selectedSimulation.calculation_result)}</p>
                            <p><strong>Date:</strong> {new Date(selectedSimulation.created_at).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedProgress;
