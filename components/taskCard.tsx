import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRef } from 'react';

interface Tasks {
    topic: string;
    text: string;
    onDelete: () => void;
}

const TaskCard = ({ topic, text, onDelete }: Tasks) => {
    const swipeRef = useRef<Swipeable>(null);


    const confirmDelete = () => {
        Alert.alert(
            "Delete Task?",
            "This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: () => {
                        onDelete();
                        swipeRef.current?.close();
                    }
                }
            ]
        );
    };

    return (
        <Swipeable
            ref={swipeRef}
            renderRightActions={() => (
                <View className="justify-center h-full">
                    <TouchableOpacity
                        onPress={confirmDelete}
                        activeOpacity={0.7}
                        className="w-20 h-[100px] bg-red-600 rounded-lg items-center justify-center ml-4"
                    >
                        <MaterialCommunityIcons
                            name="delete-forever-outline"
                            size={26}
                            color="white"
                        />
                        <Text
                            className="mt-1 text-sm font-semibold text-white"
                            style={{ fontFamily: "Poppins_400Regular" }}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

            )}
        >
            <View className="h-[100px] w-full bg-gray-200 rounded-lg p-2 mb-4 relative">
                <Text
                    style={{ fontFamily: 'Poppins_700Bold' }}
                    className="mb-2 text-xl text-blue-950">{topic}
                </Text>
                <Text
                    style={{ fontFamily: 'Poppins_400Regular' }}
                    className="text-sm text-gray-500">
                    {text}
                </Text>
                <Text
                    style={{ fontFamily: 'Poppins_400Regular' }}
                    className="absolute w-full mt-2 text-xs text-right text-gray-500 bottom-2 right-2">
                    {new Date().toLocaleDateString()}
                </Text>
            </View>
        </Swipeable>
    )
}

export default TaskCard