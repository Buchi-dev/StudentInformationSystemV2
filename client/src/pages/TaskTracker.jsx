import { useState } from 'react';
import { Typography, Input, Button, List, Card, Checkbox } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function TaskTracker() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    // Add a new task
    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    // Toggle task completion status
    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(updatedTasks);
    };

    // Remove a task
    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Card>
                <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Task Tracker
                </Title>
                
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <Input
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter a task"
                        onKeyPress={handleKeyPress}
                        style={{ marginRight: '10px' }}
                    />
                    <Button 
                        type="primary" 
                        onClick={addTask} 
                        icon={<PlusOutlined />}
                    >
                        Add
                    </Button>
                </div>

                <Card title={`My Tasks (${tasks.length})`}>
                    {tasks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <Text type="secondary">No tasks yet. Add a task to get started!</Text>
                        </div>
                    ) : (
                        <List
                            dataSource={tasks}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button 
                                            type="primary"
                                            onClick={() => toggleComplete(index)}
                                        >
                                            {item.completed ? "Undo" : "Complete"}
                                        </Button>,
                                        <Button 
                                            danger 
                                            icon={<DeleteOutlined />} 
                                            onClick={() => removeTask(index)}
                                        >
                                            Remove
                                        </Button>
                                    ]}
                                >
                                    <Checkbox 
                                        checked={item.completed} 
                                        onChange={() => toggleComplete(index)}
                                    />
                                    <span 
                                        style={{ 
                                            marginLeft: '10px',
                                            textDecoration: item.completed ? 'line-through' : 'none',
                                            opacity: item.completed ? 0.5 : 1
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                </List.Item>
                            )}
                        />
                    )}
                </Card>
            </Card>
        </div>
    );
}

export default TaskTracker;
