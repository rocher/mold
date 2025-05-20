function title() {
   echo -e "\e[1;36m--\n--  ${*}\n--\e[0m"
}

function cmd() {
   echo -e "\e[1;7;32m\$ ${*} \e[0m"
   $*
}

function test() {
   echo -e "\e[1;32m\$ ${*} \e[0m"
   $*
}