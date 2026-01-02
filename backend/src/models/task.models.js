import mongoose, {Schema} from "mongoose"

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "task title is required"],
        },
        task_grade: {
            type: String,
            required: [true, "please select task grade"],
            enum: ["A", "B", "C"],
            default: none,
        },
        is_complete: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true},
)

export const task = new mongoose.model("Task", taskSchema);