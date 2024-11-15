import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Bidangmiring.css';

const g = 9.8; // Percepatan gravitasi (m/s^2)

const BidangMiring = () => {
    const [mass, setMass] = useState<number>(5);
    const [angle, setAngle] = useState<number>(30);
    const [friction, setFriction] = useState<number>(0.25);
    const [baseLength, setBaseLength] = useState<number>(5);

    const [results, setResults] = useState({
        weight: 0.0,
        wx: 0.0,
        wy: 0.0,
        velocity: 0.0,
        time: 0.0,
    });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationFrameId = useRef<number | null>(null);

    const calculatePhysics = (mass: number, angle: number, friction: number, length: number) => {
        const theta = (angle * Math.PI) / 180;
        const weight = mass * g;
        const wx = weight * Math.sin(theta);
        const wy = weight * Math.cos(theta);
        const frictionForce = friction * wy;

        let acceleration = (wx - frictionForce) / mass;
        if (acceleration < 0) acceleration = 0;

        const velocity = Math.sqrt(2 * acceleration * length);
        const time = acceleration > 0 ? Math.sqrt(2 * length / acceleration) : 0;

        return { weight, wx, wy, velocity, time };
    };

    const startSimulation = () => {
        const { weight, wx, wy, velocity, time } = calculatePhysics(mass, angle, friction, baseLength);
        setResults({ weight, wx, wy, velocity, time });

        if (!isAnimating) {
            setIsAnimating(true);
            animateBox(time, baseLength);
        }
    };

    const resetSimulation = () => {
        setMass(5);
        setAngle(30);
        setFriction(0.25);
        setBaseLength(5);
        setResults({
            weight: 0.0,
            wx: 0.0,
            wy: 0.0,
            velocity: 0.0,
            time: 0.0,
        });
        setIsAnimating(false);
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        drawScene(0);
    };

    const animateBox = (time: number, length: number) => {
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsedTime = (currentTime - startTime) / 1000;
            const distance = Math.min((elapsedTime / time) * length, length);

            drawScene(distance);

            if (distance < length && isAnimating) {
                animationFrameId.current = requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
            }
        };

        animationFrameId.current = requestAnimationFrame(animate);
    };

    const drawScene = (distance: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const theta = (angle * Math.PI) / 180;
        const baseLengthScaled = baseLength * 30;
        const inclineHeight = Math.tan(theta) * baseLengthScaled;

        const startX = 30;
        const startY = canvas.height - 50;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + baseLengthScaled, startY);
        ctx.lineTo(startX + baseLengthScaled, startY - inclineHeight);
        ctx.closePath();
        ctx.stroke();

        const x = startX + distance * (baseLengthScaled / baseLength);
        const y = startY - (distance * Math.tan(theta) * (baseLengthScaled / baseLength));

        ctx.save();
        ctx.translate(x + 10, y - 10);
        ctx.rotate(-theta);

        ctx.fillStyle = "#FF5733";
        ctx.fillRect(-10, -10, 20, 20);

        ctx.restore();
    };

    const saveBidangMiringToDatabase = async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError || !userData.user) {
                throw new Error("Anda harus login untuk menyimpan simulasi!");
            }

            // Parameter dan hasil perhitungan disimpan dalam bentuk JSON
            const parameters = JSON.stringify({
                mass,
                angle,
                friction,
                baseLength
            });

            const calculationResult = JSON.stringify({
                weight: results.weight,
                wx: results.wx,
                wy: results.wy,
                velocity: results.velocity,
                time: results.time
            });

            const { error } = await supabase.from('plane_simulations').insert([
                {
                    user_id: userData.user.id,
                    parameters,
                    calculation_result: calculationResult,
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

    useEffect(() => {
        drawScene(0);
    }, [angle, baseLength]);

    return (
        <div className="main-content">
            <h2>Hukum Newton pada Bidang Miring</h2>

            <div className="outer-container">
                <div className="simulator-content">
                    <div className="triangle-container" id="triangleContainer">
                        <canvas ref={canvasRef} id="simulationCanvas" width="450" height="290"></canvas>
                    </div>

                    <div className="parameters">
                        <h3>Parameter</h3>
                        <label>Massa Beban (kg)</label>
                        <input type="number" value={mass} min="1" max="10" onChange={(e) => setMass(Number(e.target.value))} />
                        
                        <label>Sudut (derajat): {angle}</label>
                        <input type="range" value={angle} min="1" max="75" onChange={(e) => setAngle(Number(e.target.value))} />
                        
                        <label>Koefisien Gesekan: {friction}</label>
                        <input type="range" value={friction} min="0" max="1" step="0.01" onChange={(e) => setFriction(Number(e.target.value))} />
                        
                        <label>Panjang Dasar (m)</label>
                        <input type="number" value={baseLength} min="1" max="10" onChange={(e) => setBaseLength(Number(e.target.value))} />
                    </div>
                </div>

                <div className="controls">
                    <button onClick={startSimulation}>Execute</button>
                    <button onClick={resetSimulation}>Restart</button>
                    <button onClick={saveBidangMiringToDatabase}>Save</button>
                </div>
                
                <div className="results">
                    <h3>Hasil Perhitungan :</h3>
                    <div className="result-items">
                        <p>• Berat (W): {results.weight.toFixed(2)} N</p>
                        <p>• Gaya kubus menuruni bidang (Wx): {results.wx.toFixed(2)} N</p>
                        <p>• Komponen Berat sumbu-y (Wy): {results.wy.toFixed(2)} N</p>
                        <p>• Kecepatan kotak: {results.velocity.toFixed(2)} m/s</p>
                        <p>• Waktu sampai ke dasar: {results.time.toFixed(2)} s</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BidangMiring;
