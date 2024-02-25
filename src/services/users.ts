const githubAPIToken = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;

const myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.github+json");
myHeaders.append("Authorization", `Bearer ${githubAPIToken}`);
myHeaders.append("X-GitHub-Api-Version", "2022-11-28");

const requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

export const getUsersService = async (page: number = 1, limit: number = 20) => {
  const response = await fetch(`https://api.github.com/users?page=${page}&per_page=${limit}`, requestOptions);
  const data = await response.json();
  return data;
}

export const getUsersWithFollowersService = async (page: number = 1, limit: number = 20) => {
  const usersWithFollowers: any[] = [];

  try {
    const users = await getUsersService(page, limit);

    await Promise.all(
      users.map(async (user: any) => {
        const response = await fetch(user.url, requestOptions);
        const data = await response.json();
        usersWithFollowers.push(data);
      })
    )

    return usersWithFollowers;

  } catch (err) {
    console.error(err);
  }
}