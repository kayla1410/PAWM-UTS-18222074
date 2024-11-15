import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Pastikan path ke supabaseClient sesuai
import './Jungkatjungkit.css';

const JungkatJungkit: React.FC = () => {
    const [leftTorque, setLeftTorque] = useState<number>(0);
    const [rightTorque, setRightTorque] = useState<number>(0);
    const [weights, setWeights] = useState<string[]>([]); // Menyimpan daftar beban yang dimasukkan

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const drag = (event: React.DragEvent<HTMLButtonElement>) => {
        event.dataTransfer.setData("weight", event.currentTarget.getAttribute("data-weight") || "0");
    };

    const drop = (event: React.DragEvent<HTMLDivElement>, side: string, distance: number) => {
        event.preventDefault();
        const weight = event.dataTransfer.getData("weight");
        const weightInt = parseInt(weight);
        const target = document.getElementById(`${side}-load`);

        // Tambahkan beban ke daftar weights
        setWeights(prevWeights => [...prevWeights, `${side}-${weight}kg`]);

        // Calculate torque based on weight and distance from the fulcrum
        const torque = weightInt * distance;

        if (side === 'left') {
            setLeftTorque(prev => prev + torque);
        } else if (side === 'right') {
            setRightTorque(prev => prev + torque);
        }

        // Add the weight element to the respective side
        const weightElement = document.createElement('div');
        weightElement.innerHTML = `${weight} kg`;
        weightElement.className = 'placed-weight';
        target?.appendChild(weightElement);

        updateBalance();
    };

    const updateBalance = () => {
        const beam = document.getElementById("beam");
        const balance = rightTorque - leftTorque;
        const angle = Math.min(Math.max(balance * 0.3, -30), 30); // Adjust rotation sensitivity as needed

        if (beam) {
            beam.style.transform = `rotate(${angle}deg)`;
        }
    };

    const reset = () => {
        setLeftTorque(0);
        setRightTorque(0);
        setWeights([]); // Reset daftar beban

        // Reset beam rotation
        const beam = document.getElementById("beam");
        if (beam) {
            beam.style.transform = "rotate(0deg)";
        }

        // Clear weight elements
        const leftLoad = document.getElementById("left-load");
        const rightLoad = document.getElementById("right-load");

        if (leftLoad) leftLoad.innerHTML = "";
        if (rightLoad) rightLoad.innerHTML = "";
    };

    const saveJungkatJungkitToDatabase = async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError || !userData.user) {
                throw new Error("Anda harus login untuk menyimpan simulasi!");
            }

            const { error } = await supabase.from('simulations').insert([
                { 
                    user_id: userData.user.id,
                    weights: JSON.stringify(weights), // Simpan daftar beban sebagai JSON string
                }
            ]);

            if (error) {
                console.error("Database error:", error);
                throw new Error("Database error: " + error.message);
            }

            alert("Simulasi berhasil disimpan!");
        } catch (error) {
            console.error("Error saving simulation:", error);
            alert("Gagal menyimpan simulasi. Silakan coba lagi.");
        }
    };

    return (
        <div className="main-content">
            <h2>Jungkat Jungkit Sederhana</h2>
            
            <div className="outer-container">
                <div className="simulator-area">
                    <div className="jungkat-jungkit-container">
                        <div 
                            className="load-area left-load" 
                            id="left-load" 
                            onDrop={(event) => drop(event, 'left', 2)}
                            onDragOver={allowDrop}
                        ></div>
                        <div className="fulcrum" id="fulcrum">
                            <div className="beam" id="beam"></div>
                            <div className="triangle"></div>
                        </div>
                        <div 
                            className="load-area right-load" 
                            id="right-load" 
                            onDrop={(event) => drop(event, 'right', 2)}
                            onDragOver={allowDrop}
                        ></div>
                    </div>
                    <div className="button-container">
                        <button className="restart-button" onClick={reset}>Restart</button>
                        <button className="save-button" onClick={saveJungkatJungkitToDatabase}>Save</button>
                    </div>
                </div>
                
                <div className="weight-selection">
                    <h3>Pilihan Beban :</h3>
                    <div className="weights">
                        <button 
                            className="weight-button" 
                            draggable 
                            onDragStart={drag} 
                            data-weight="1"
                        >1 kg</button>
                        <button 
                            className="weight-button" 
                            draggable 
                            onDragStart={drag} 
                            data-weight="2"
                        >2 kg</button>
                        <button 
                            className="weight-button" 
                            draggable 
                            onDragStart={drag} 
                            data-weight="5"
                        >5 kg</button>
                        <button 
                            className="weight-button" 
                            draggable 
                            onDragStart={drag} 
                            data-weight="10"
                        >10 kg</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JungkatJungkit;
