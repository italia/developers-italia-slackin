FROM node:10.19.0-slim

# Env variables definition
ENV USER developers
ENV HOME /srv/www
ENV PORT 3000

# Set the work directory
WORKDIR ${HOME}

# Install software requirements
# ca-certificates is used to make https://akv2k8s.io/ work
RUN apt update
RUN apt install -y ca-certificates

# Copy Slackin files inside the workdir
COPY .bluemix .bluemix 
COPY bin bin
COPY lib lib
COPY scripts scripts
COPY test test
COPY app.json .
COPY gulpfile.babel.js .
COPY license.md .
COPY package.json .
COPY Procfile .
COPY web.config .

# Run as unprivileged user
RUN adduser --home ${HOME} --shell /bin/bash --disabled-password ${USER}

# Set user ownership on workdir and subdirectories
RUN chown -R ${USER}.${USER} ${HOME}

# Set running user
USER ${USER}

# Install dependencies
RUN npm install --unsafe-perm

# Expose port to outside world
EXPOSE ${PORT}

# By default, start Slackin when the container starts
CMD ./bin/slackin --coc "$SLACK_COC" --channels "$SLACK_CHANNELS" --port $PORT $SLACK_SUBDOMAIN $SLACK_API_TOKEN $GOOGLE_CAPTCHA_SECRET $GOOGLE_CAPTCHA_SITEKEY
