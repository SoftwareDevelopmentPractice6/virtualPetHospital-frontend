#!/bin/sh

export main_frontend_log=../logs/ui/main.log
export panorama_frontend_log=../logs/ui/panorama.log

export GREEN="\e[32m"
export BLUE="\e[34m"
export ENDCOLOR="\e[0m"

startProd(){
    echo "Start running"
    echo "-----------------------------------"
    sleep 1
    mkdir -p logs/ui
    echo "Logs of running each module can be found in:"
    printf -- "- main:     ${GREEN}$main_frontend_log${ENDCOLOR}\n"
    printf -- "- panorama: ${GREEN}$panorama_frontend_log${ENDCOLOR}\n"
    echo " "
    echo "-----------------------------------"
    (cd pet-hospital-ui && npm run serve:docker >> $main_frontend_log) &
    (cd panorama-ui && npm run serve:linux >> $panorama_frontend_log) &
    (
        echo "Starting......"
        timer=0
        while(( $timer<=100 ))
        do
            printf "$timer %%\r"
            sleep 1
            timer=`expr $timer + 10`
        done
        echo "Running completed"
        echo "-----------------------------------"
        echo "Running address of each module:"
        printf -- "- main:     ${BLUE}http://127.0.0.1:8080${ENDCOLOR}\n"
        printf -- "- panorama: ${BLUE}http://127.0.0.1:9527${ENDCOLOR}\n"
        echo " "
    ) &
    wait
    echo "Project was terminated"
}

startProd

exit 0
