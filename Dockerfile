FROM ubuntu:latest
LABEL authors="dwads"

ENTRYPOINT ["top", "-b"]
