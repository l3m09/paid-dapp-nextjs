SHELL=/bin/bash

include .env
export

.PHONY: up
up: build network run

.PHONY: build
build:
	docker build -t paid-dapp --target=production \
		--build-arg=REACT_APP_WEB3_WSS=${REACT_APP_WEB3_WSS} \
		--build-arg=REACT_APP_RECIPIENT_ERC20_TOKEN=${REACT_APP_RECIPIENT_ERC20_TOKEN} \
		--build-arg=REACT_APP_PAYMENTS_PAID_TOKEN=${REACT_APP_PAYMENTS_PAID_TOKEN} \
		--build-arg=REACT_APP_WAKU_SERVER=${REACT_APP_WAKU_SERVER} \
		--build-arg=REACT_APP_IPFS_PAID_HOST=${REACT_APP_IPFS_PAID_HOST} .

.PHONY: network
network:
	docker network inspect paid-net &> /dev/null; \
    	if [ $$? -ne 0 ]; then docker network create paid-net ; fi

.PHONY: run
run:
	docker container run -d \
     	--name paid-dapp \
      	--network paid-net \
      	-p 3000:3000 paid-dapp

.PHONY: down
down:
	docker container rm -f paid-dapp

.PHONY: logs
logs:
	docker logs -f --tail 10 paid-dapp