### ZENGAKU is a study webiste application project made by Fivil Team.
Fivil team includes Hoang Luan, Nguyen Vy, Nguyen Hai, Du Yen from 23GIT, 23JIT and 23GITB classes - Vietname - Korea university of infomation and communications technology.

This project was used to join Best website design 2024 at VKU and it had be paused after that competition.

This project became open source from 08/09/2024.

### Run with Docker Compose

```bash
docker compose up --build
```

The application runs at `http://localhost:8080/ZenGaku`.

If port `3306` is already used by an old MySQL container, stop it first:

```bash
sudo docker rm -f zengaku-mysql
```

To recreate the database from `database.sql`:

```bash
docker compose down -v
docker compose up --build
```
