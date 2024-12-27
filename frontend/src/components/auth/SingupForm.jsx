import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-hot-toast";

const SingupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: async (err) => {
      toast.error(err.response.data.message || "Something went wrong ");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(name, email, username, password);
    signupMutation({ name, email, username, password });
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full text-white"
      >
        {isLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Agree & Join"
        )}
      </button>
    </form>
  );
};

export default SingupForm;
