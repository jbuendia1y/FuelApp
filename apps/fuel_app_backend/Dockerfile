FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7

# SET WORKSPACE
WORKDIR /app

# UPGRADE PIP
RUN pip install --upgrade pip

# INSTALL Pipenv
RUN pip install pipenv 

# COPY Pipfiles
COPY Pipfile .
COPY Pipfile.lock .

# INSTALL DEPENDENCIES
RUN pipenv install

# COPY ALL FILES
COPY . .

# PORT EXPOSE
EXPOSE 8000

CMD ["pipenv","run","start"]