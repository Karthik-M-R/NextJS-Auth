import { use } from "react";

export default function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    // This one line unwraps the "id" from the promise
    const { id } = use(params);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-lg">
                User ID: <span className="p-2 bg-orange-400 rounded text-white">{id}</span>
            </p>
        </div>
    );
}