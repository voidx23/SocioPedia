import User from "../models/User.js";

/* READ */

export const getUser = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}

export const getUserFriends = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);


    } catch (err) {

        res.status(404).json({ message: err.message });

    }

};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        console.log(user);
        console.log(friend);
        console.log("sdfytfghb");

        if (user.friends.includes(friendId)) {
            console.log("sdfhgbf");
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
            console.log("aszvbsdfhgbf");


        } else {
            console.log(friendId, id);
            user.friends.push(friendId);
            console.log("sdfsazahgbf");

            friend.friends.push(id);
            console.log("sdfsazahgbf");

        }
        console.log("sgfchvbm,df");

        await user.save();
        await friend.save();
        console.log("sioukghfvdf");

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        console.log("sdf");
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        console.log(formattedFriends, "hihi");
        res.status(200).json(formattedFriends);

    } catch (err) {

        res.status(404).json({ message: err.message });

    }
}