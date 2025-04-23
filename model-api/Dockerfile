FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --cache-dir=/pip_cache -r requirements.txt

COPY app/ ./app/
COPY models/ ./models/

CMD ["python", "app/main.py"]