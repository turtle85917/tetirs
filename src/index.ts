import FunnyTerminal from "funny-terminal";

const readline = new FunnyTerminal();
readline.setCursorShow(false);
readline.setKeypressDisable(true);
readline.setOnlyDirectionKeys(true);
readline.setASDWIsDirectionKeys(true);

readline.addActionListener(data => {
  readline.coverMessage(data.name)
});
