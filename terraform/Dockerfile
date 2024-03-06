FROM hashicorp/terraform AS base

RUN apk add bash

WORKDIR /usr/src

COPY . .

ENTRYPOINT [ "/bin/bash" ]
CMD ["start.sh"]
