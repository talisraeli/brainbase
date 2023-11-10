const handleSaveThought = (event, text: string) => {
  console.log("Saving", text);
};

export const registerHandlers = (ipcMain) => {
  ipcMain.on("save-thought", handleSaveThought);
};
