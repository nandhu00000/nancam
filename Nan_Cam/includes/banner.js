
// banner.js

const RED = "\x1b[31m";
const ORANGE = "\x1b[38;5;208m";
const CYAN = "\x1b[36m";
const PURPLE = "\x1b[35m";
const RESET = "\x1b[0m";



function mainbanner(version = "v1.0") {
  console.clear();

  const banner = `
                                                                         ${version}
${PURPLE}
███╗   ██╗ █████╗ ███╗   ██╗     ██████╗ █████╗ ███╗   ███╗
████╗  ██║██╔══██╗████╗  ██║    ██╔════╝██╔══██╗████╗ ████║
██╔██╗ ██║███████║██╔██╗ ██║    ██║     ███████║██╔████╔██║
██║╚██╗██║██╔══██║██║╚██╗██║    ██║     ██╔══██║██║╚██╔╝██║
██║ ╚████║██║  ██║██║ ╚████║    ╚██████╗██║  ██║██║ ╚╝ ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝    ╚═╝

                                      Author: Nandha L
                                      Nickname: Mr.Robot
`;

console.log(banner);

}


function showBanner(version = "v1.0") {
  console.clear();

  const banner = `
                                                                         ${version}
${PURPLE}
███╗   ██╗ █████╗ ███╗   ██╗     ██████╗ █████╗ ███╗   ███╗
████╗  ██║██╔══██╗████╗  ██║    ██╔════╝██╔══██╗████╗ ████║
██╔██╗ ██║███████║██╔██╗ ██║    ██║     ███████║██╔████╔██║
██║╚██╗██║██╔══██║██║╚██╗██║    ██║     ██╔══██║██║╚██╔╝██║
██║ ╚████║██║  ██║██║ ╚████║    ╚██████╗██║  ██║██║ ╚╝ ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝    ╚═╝

                                      Author: Nandha L
                                      Nickname: Mr.Robot

       ${RED}     Main Menu             
${RESET}┏━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━┓
${RESET}┃ No. ┃ Option                   ┃
${RESET}┡━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━┩
${RESET}│${RED} 1   ${RESET}│🎯 Create new Target  ${RESET}    │
${RESET}│${RED} 2   ${RESET}│📂 Select Existing Target │
${RESET}│${RED} 0  ${RESET} │❌ Quit                   │
${RESET}└─────┴──────────────────────────┘
`;

  console.log(banner);
}

module.exports = {
  showBanner,
  mainbanner
};
