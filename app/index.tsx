import TaskCard from "@/components/taskCard";
import "../global.css";

import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Tasks {
  topic: string;
  text: string;
}

const index = () => {
  const [inputTopic, setInputTopic] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [displayTasks, setDisplayTasks] = useState<Tasks[]>([
    { topic: 'Grocery Shopping', text: 'Buy fruits, vegetables, and snacks for the week.' },
    { topic: 'Workout', text: 'Complete a 30-minute cardio session and strength training.' },
    { topic: 'Read a Book', text: 'Finish reading the next two chapters of the novel.' },
    { topic: 'Meeting with Team', text: 'Discuss project milestones and next steps.' },
  ]);

  const handleAddTask = () => {
    if(!inputTopic.trim() || !inputText.trim()) {
      return;
    }
    setDisplayTasks(prev => [...prev, { topic: inputTopic, text: inputText }]);
    setInputTopic('');
    setInputText('');
  }

  const handleDeleteTask = (index: number) => {
    setDisplayTasks(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <View className="items-center justify-start flex-1 w-full p-8 mt-8 bg-gray-100">
      <View>
        <Text
          style={{ fontFamily: 'Poppins_700Bold' }}
          className="text-4xl text-gray-700">
          Plan
          <Text className="text-5xl text-blue-800">.</Text>
          Track
          <Text className="text-5xl text-blue-800">.</Text>
          Finish
          <Text className="text-5xl text-blue-800">.</Text>
        </Text>
      </View>
      <View className="w-full gap-4 mt-12">
        <TextInput
          className="w-full h-[50px] border border-gray-300 rounded-lg px-4"
          placeholder="What’s the topic?"
          value={inputTopic}
          onChangeText={setInputTopic}
        />

        <TextInput
          className="w-full h-[100px] border border-gray-300 rounded-lg px-4"
          placeholder="Write your plan here…"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity
          className="items-center justify-center w-full h-[50px] bg-blue-600 rounded-lg"
          activeOpacity={0.6}
          onPress={() => handleAddTask()}
        >
          <Text
            style={{ fontFamily: 'Poppins_700Bold' }}
            className="text-lg text-gray-50">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      {displayTasks.length === 0 ? (
        <View
          className="items-center justify-center flex-1 w-full mt-4">
          <Text className="text-lg text-gray-500" style={{ fontFamily: 'Poppins_400Regular' }}>
            No Tasks Available
          </Text>
          <Text className="mt-1 text-sm text-gray-400" style={{ fontFamily: 'Poppins_400Regular' }}>
            Start planning your day ✨
          </Text>
        </View>
      ) :
        <ScrollView className="w-full mt-8" showsVerticalScrollIndicator={false}>
          { displayTasks.map((task, index) => {
            return <TaskCard key={index} topic={task.topic} text={task.text} onDelete={() => handleDeleteTask(index)} />
          })}
        </ScrollView>
      }
    </View>
  )
}

export default index