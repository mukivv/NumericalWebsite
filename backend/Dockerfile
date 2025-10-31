FROM python:3.13

WORKDIR /backend

COPY ./require.txt /backend/require.txt

RUN pip install -r /backend/require.txt

COPY . /backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
