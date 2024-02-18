function title() {
   echo -e "\e[1;35m${*}\e[0m"
}


function test() {
   echo -e "\e[1;7;35m ${*} \e[0m"
   $*
}