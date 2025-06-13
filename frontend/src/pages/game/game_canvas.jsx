// GameCanvas.jsx
import { useState } from 'react';
import { PlayerController } from '../../game/core/player/player_controller';
import GameScene from './game_scene';
import OperationPanel from './operation_panel';

const GameCanvas = () => {
    const playerData = new PlayerController("Player1");
    const [temperature, setTemperature] = useState(28);
    const [enclosures, setEnclosures] = useState([]);
    const [player, setPlayer] = useState(playerData);
    const [selectedEnclosureIndex, setSelectedEnclosureIndex] = useState(null);
    const [, forceUpdate] = useState(0);

    const nextDay = () => {
        setTemperature((prev) => Math.max(10, Math.min(40, prev + (Math.random() * 2 - 1))));
        player.currenDay += 1;
    };

    const addEnclosure = () => {
        const cost = 100;
        if (player.cash >= cost) {
            player.changeCash(-cost);
            setEnclosures((prev) => [...prev, { x: 150 + prev.length * 60, y: 480 }]);
            forceUpdate(n => n + 1);
        } else {
            alert("資金不足，無法新增飼育箱");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* 玩家進度資訊 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px' }}>
                        <div style={{ fontSize: '16px', color: '#333' }}>
                            Temp: {temperature.toFixed(1)}°C | Player Level: {Math.floor(player.level)} | Cash: ${player.cash} | Curren Day: {player.currenDay}
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={nextDay}>Next Day</button>
                            <button onClick={addEnclosure}>Add Enclosure</button>
                        </div>
                    </div>

                    {/* 遊戲操作畫面 */}
                    <GameScene enclosures={enclosures} setSelectedEnclosureIndex={setSelectedEnclosureIndex} />
                </div>

                {/* 玩家互動介面 */}
                <OperationPanel selectedEnclosureIndex={selectedEnclosureIndex} setSelectedEnclosureIndex={setSelectedEnclosureIndex}
                />
            </div>

            {/* <div style={{ height: '120px', borderTop: '1px solid #aaa', padding: '8px' }}>
                <p>這裡預留給聊天室</p>
            </div> */}
        </div>
    );
};

export default GameCanvas;
