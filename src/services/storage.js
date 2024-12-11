export function getAllUsers() {
  try {
    const users = localStorage.getItem("users");

    if (!users) return [];

    if (typeof users !== "string") return [];

    const usersList = JSON.parse(users);

    if (Array.isArray(usersList)) return usersList;

    return [];
  } catch (exception) {
    console.error(`getAllUsers: ${exception}`);
    return [];
  }
}

export function getOneUser(email) {
  try {
    const usersList = getAllUsers();

    const user = usersList.find((user) => user.email === email);

    if (user) return user;

    return null;
  } catch (exception) {
    console.error(`getOneUser: ${exception}`);
    return null;
  }
}

export function setActiveUser(email) {
  try {
    if (!email) return null;

    if (typeof email !== "string") return null;

    localStorage.setItem("activeUser", email);

    return email;
  } catch (exception) {
    console.error(`setActiveUser: ${exception}`);
    return null;
  }
}

export function getActiveUser() {
  try {
    const user = localStorage.getItem("activeUser");

    if (typeof user === "string") return user;

    return null;
  } catch (exception) {
    console.error(`getActiveUser: ${exception}`);
    return null;
  }
}

export function createUser(email, password) {
  try {
    if (!email || !password) return null;

    const user = getOneUser(email);

    if (user) return null;

    const newUser = { email, password };

    const usersList = getAllUsers();

    usersList.push(newUser);

    const usersListStringified = JSON.stringify(usersList);

    localStorage.setItem("users", usersListStringified);

    setActiveUser(email);

    return newUser;
  } catch (exception) {
    console.error(`createUser: ${exception}`);
    return null;
  }
}

export function signInUser(email, password) {
  try {
    const usersList = getAllUsers();

    const user = usersList.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) return null;

    setActiveUser(email);

    return user;
  } catch (exception) {
    console.error(`signInUser: ${exception}`);
    return null;
  }
}

export function signOutUser() {
  try {
    localStorage.removeItem("activeUser");
    return null;
  } catch (exception) {
    console.error(`signOutUser: ${exception}`);
    return null;
  }
}

export function getAllResources(resourceName) {
  try {
    if (typeof resourceName !== "string") return [];

    const resources = localStorage.getItem(resourceName);

    if (typeof resources !== "string") return [];

    const resourcesList = JSON.parse(resources);

    if (Array.isArray(resourcesList)) return resourcesList;

    return [];
  } catch (exception) {
    console.error(exception);
    return [];
  }
}

export function getAllResourcesByUser(resourceName) {
  try {
    if (typeof resourceName !== "string") return [];

    const resources = localStorage.getItem(resourceName);

    if (typeof resources !== "string") return [];

    const resourcesList = JSON.parse(resources);

    if (Array.isArray(resourcesList)) {
      const id = getActiveUser();
      return resourcesList.filter((resource) => resource.id === id);
    }

    return [];
  } catch (exception) {
    console.error(exception);
    return [];
  }
}

export function createResource(resourceName, resourceData) {
  try {
    if (typeof resourceName !== "string") return null;

    if (typeof resourceData !== "object") return null;

    const resourcesList = getAllResources(resourceName);

    const id = getActiveUser();

    if (!id) return null;

    const createdAt = new Date().toISOString();

    const data = { id, category: resourceName, ...resourceData, createdAt };

    resourcesList.push(data);

    const resourcesListStringified = JSON.stringify(resourcesList);

    localStorage.setItem(resourceName, resourcesListStringified);

    return resourceData;
  } catch (exception) {
    console.error(exception);
    return null;
  }
}

export function createSettings(settings) {
  try {
    if (typeof settings !== "object") return {};

    const settingsStringified = JSON.stringify(settings);

    localStorage.setItem("settings", settingsStringified);

    return settings;
  } catch (exception) {
    console.error(exception);
    return {};
  }
}

export function getSettings() {
  try {
    const settings = localStorage.getItem("settings");

    if (typeof settings !== "string") return {};

    const settingsDict = JSON.parse(settings);

    return settingsDict;
  } catch (exception) {
    console.error(exception);
    return {};
  }
}
