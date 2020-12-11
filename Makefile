SHELL=/bin/bash

include makefile.env
export

.PHONY: up
up: build network run

.PHONY: build
build:
	docker build \
        --build-arg GITHUB_USER=$(GITHUB_USER) \
        --build-arg GITHUB_PASS=$(GITHUB_PASS) \
        -t paid-dapp-web .

.PHONY: network
network:
	docker network inspect paid-net &> /dev/null; \
    	if [ $$? -ne 0 ]; then docker network create paid-net ; fi

.PHONY: run
run:
	docker run -d \
     	--name paid-dapp-web \
      	--network paid-net \
      	-p 8080:80 paid-dapp-web
