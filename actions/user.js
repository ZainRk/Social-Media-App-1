"use server"

import { db } from "@/lib/db"
import { deleteFile, uploadFile } from "./uploadFile";

export const createUser = async (user) => {

const {id, first_name, last_name, email_address, image_url, username} =
user;

try {
    const userExists = await db.user.findUnique({
        where: {
            id
        }
    })

    if (userExists) {
        updateUser(user)
        return
    }

    await db.user.create({
        data: {
            id,
            first_name,
            last_name,
            email_address,
            image_url,
            username
        }
    })

}catch(e) {
    console.log(e);
    
    return{
        error: "Failed to save in db"
    }
}
}

export const updateUser = async(user) => {
    const {id, first_name, last_name, email_address, image_url, username} =
    user;

    try{
        await db.user.update({
            where: {
                id,
            },
            data: {
                first_name,
                last_name,
                email_address,
                image_url,
                username,
            },
        })
        console.log("user is updated in db");
        
    }
    catch(e)

    {
console.log(e);
return {
error: "Failed to update in db"
}

    }
    
}



export const getUser = async (id) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id,
            },
            select:{
                id: true,
                first_name: true,
                last_name: true,
                email_address: true,
                image_url: true,
                username: true,
                banner_url: true,
                banner_id: true,
            }
        });

        return {data:user};
    } catch (e) {
        console.error(e);
        return {
            error: "Failed to get user from db",
        };
    }
};


export const deleteUser = async (id) => { 
    try{
    await db.user.delete({
        where: {
            id,
        },
    })

    console.log("User is deleted from the db");
    
} catch(e)
{
console.log(e);
return {
    error: "Failed to delete in db"
}
}
}


export const updateBanner = async (params) => {
    const { id, banner, prevBannerId } = params;
    try {
      let banner_id;
      let banner_url;
  
      if (banner) {
        const res = await uploadFile(banner, `/users/${id}`);
        const { public_id, secure_url } = res;
        banner_id = public_id;
        banner_url = secure_url;
  
        // Delete previous banner
        if (prevBannerId) {
          await deleteFile(prevBannerId);
        }
      }
      await db.user.update({
        where: {
          id,
        },
        data: {
          banner_url,
          banner_id,
        },
      });
      console.log("user banner updated");
    } catch (e) {
      console.log("Error updating user banner");
      throw e;
    }
  };

  export const getAllFollowersAndFollowingsInfo = async (id) => {
    try {
      const followers = await db.follow.findMany({
        where: {
          followingId: id,
        },
        include: {
          follower: true,
        },
      });
      const following = await db.follow.findMany({
        where: {
          followerId: id,
        },
        include: {
          following: true,
        },
      });
      return {
        followers,
        following,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  };