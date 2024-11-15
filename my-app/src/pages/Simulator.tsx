import React from 'react';
import Sidebar from '../components/Sidebar';
import './Simulator.css';
import bidangMiringImage from '../images/bidangmiring.png';
import jungkatJungkitImage from '../images/jungkatjungkit.jpeg';

const Simulator = () => {
    return (
        <div className="app-container">

            <div className="main-content">
                <h2>Simulator</h2>

                <div className="simulator-card-simulator">
                    <div className="image-placeholder-simulator">
                        <img src={bidangMiringImage} alt="Hukum Newton pada Bidang Miring" />
                    </div>
                    <div className="simulator-details">
                        <h3>Hukum Newton pada Bidang Miring</h3>
                        <p>
                            Simulator interaktif ini dapat digunakan untuk mempelajari dan memahami Hukum Newton pada
                            bidang miring dengan cara yang menarik dan intuitif. Kamu dapat memasukkan massa objek, sudut
                            kemiringan bidang, koefisien gesekan, serta panjang dasar bidang untuk mendapatkan perhitungan gaya,
                            kecepatan, dan waktu yang diperlukan bagi objek untuk mencapai dasar bidang.
                        </p>
                        <p>
                            Dengan mengubah parameter seperti sudut kemiringan atau koefisien gesekan, kamu dapat melihat
                            langsung bagaimana faktor-faktor tersebut memengaruhi hasil. Misalnya, semakin tinggi sudut atau
                            massa, semakin besar gaya yang bekerja pada objek. Simulator ini memberikan wawasan praktis tentang
                            konsep-konsep fisika seperti gaya berat, komponen gaya, dan pengaruh gesekan, membantu pengguna
                            memahami teori dengan cara yang visual dan langsung.
                        </p>
                        <a href="/bidangmiring">
                            <button>Open</button>
                        </a>
                    </div>
                </div>

                <div className="simulator-card-simulator">
                    <div className="image-placeholder-simulator">
                        <img src={jungkatJungkitImage} alt="Jungkat Jungkit Sederhana" />
                    </div>
                    <div className="simulator-details">
                        <h3>Jungkat Jungkit Sederhana</h3>
                        <p>
                            Simulator interaktif ini dapat digunakan untuk memahami prinsip keseimbangan momen. Kamu dapat
                            menempatkan beban dengan berat yang berbeda (1 kg, 2 kg, 5 kg, dan 10 kg) di sisi jungkat-jungkit
                            untuk melihat bagaimana posisi dan berat beban memengaruhi keseimbangan.
                        </p>
                        <p>
                            Dengan memilih dan meletakkan beban pada posisi tertentu, kamu bisa mengamati bagaimana jungkat-jungkit
                            bergerak dan kapan ia mencapai keseimbangan. Simulator ini membantu memahami konsep dasar fisika
                            seperti titik tumpu, momen gaya, dan keseimbangan dengan cara yang visual dan mudah dipahami.
                            Fitur "Reset" juga disediakan untuk mengembalikan jungkat-jungkit ke posisi awal dan mencoba kombinasi
                            beban lainnya.
                        </p>
                        <a href="/jungkatjungkit">
                            <button>Open</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulator;
