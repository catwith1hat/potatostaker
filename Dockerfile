FROM ruby:3.4

# Match the catwith1hat style: run the site from /site.
WORKDIR /site

# Ruby 3.x no longer bundles WEBrick by default.
RUN gem install webrick --no-document

# This project is static HTML/CSS/JS, so copy only runtime assets.
COPY index.html styles.css script.js logo.jpg .nojekyll ./

EXPOSE 4000

# Serve static files on 0.0.0.0:4000
CMD ["ruby", "-run", "-ehttpd", ".", "-p", "4000", "-b", "0.0.0.0"]
