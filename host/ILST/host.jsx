console.log("Host is online");

// Loading, executing, and unloading an action
function runAction(name, string) {
  // Create a temporary file
  var tmp = File(Folder.desktop + "/temp.aia");
  // Open it for writing and dump action string here
  tmp.open("w");
  tmp.write(string);
  tmp.close();
  // Load the action into Illustrator memory
  app.loadAction(tmp);
  // Execute the action:
  // ( Name of Action, name of Set, show Dialogs )
  app.doScript(name, "Live-Pathfinder", false);
  // Remove the temporary file
  tmp.remove();
  // Remove the Action set from memory
  app.unloadAction("Live-Pathfinder", "");
}
