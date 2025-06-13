const OperationPanel = ({ selectedEnclosureIndex, setSelectedEnclosureIndex }) => {
    // 遊戲互動面板
    return (
        <div style={{ width: '300px', borderLeft: '1px solid #aaa', padding: '8px' }}>
            {selectedEnclosureIndex !== null ? (
                <div>
                    <p>正在操作第 {selectedEnclosureIndex + 1} 個飼育箱</p>
                    <button onClick={() => setSelectedEnclosureIndex(null)}>關閉</button>
                </div>
            ) : (
                <p>請點選左方畫面中的飼育箱進行操作</p>
            )}
        </div>
    );
};

export default OperationPanel;