import { useWorkout } from "@hooks/useWorkout";

const Workout = () => {
    const { workout, completeWorkout, logSet, updateLoggedSet, removeLoggedSet } = useWorkout();

    console.log(workout)

    if (workout.isLoading) return <p>Loading...</p>;
    if (workout.error) return <p>Error loading workout</p>;

    return (
        <div>
            <h2>Workout: {workout.data?.split}</h2>
            <button onClick={() => completeWorkout()}>Complete Workout</button>

            {workout.data?.logs?.map((log) => (
                <div key={log.id}>
                    <p>{log.exercise_name} - Set {log.set_number}</p>
                    <button onClick={() => logSet({ logId: log.id, performedReps: 10, weightUsed: 50 })}>
                        Log Set
                    </button>
                    <button onClick={() => updateLoggedSet({ logId: log.id, performedReps: 12, weightUsed: 55 })}>
                        Update Set
                    </button>
                    <button onClick={() => removeLoggedSet({ logId: log.id })}>
                        Remove Set
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Workout