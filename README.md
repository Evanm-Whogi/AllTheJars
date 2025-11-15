# AllTheJars

AllTheJars is your ultimate hub for Minecraft downloads, offering direct access to every official and modded Minecraft jar. Designed for both server owners and players, AllTheJars ensures authenticity, reliability, and convenience by providing files directly from their original sources, we never host files ourselves.

Whether you’re setting up a modded server, updating your client, or integrating Minecraft jars into your tools, AllTheJars makes it fast and easy.

![AllTheJars Banner](https://cdn.chit.sh/chrome_HDJD_Dvdv_RF-pZrcaIWqUL4JJDnNovaV3Uyn.png)

## Features
- **Comprehensive Minecraft Jar Access:** Access all official and popular modded Minecraft jars including Forge, Spigot, Bukkit, Mohist, NeoForge, and more.
- **Direct-from-Source Downloads:** All files are fetched directly from their respective sources to guarantee authenticity.
- **Up-to-Date API:** Our API is updated every hour to ensure the latest versions of Minecraft jars are always available.
- **Lightweight & Reliable:** No third-party hosting—downloads come directly from the original sources, keeping it fast and secure.
- **Open API integration:** Easily integrate AllTheJars into your applications, scripts, or dashboards using our API.

## Getting Started 
Visit [AllTheJars](https://atj.chit.sh) to browse and download jars.<br/>
Use the **API endpoint** to fetch the latest versions programmatically.<br/>
Integrate with your server, launcher, or tool of choice.<br/>

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/WhogiTheRaccoon/AllTheJars.git
   cd AllTheJars
   ```
2. Edit the `docker-compose.yml` file:

    AllTheJars:
    ```
    environment:
        NEXT_PUBLIC_NAME: AllTheJars 
        DATABASE_URL: postgres://postgres:postgres@db:5432/appdb
        INTERNAL_API_KEY: SuperSecretApiKeyForUpdatesChangeMe
    ```
    DB:
    ```
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: appdb
      ```
3. Prepare Database
    ```
    docker-compose build
    docker-compose up -d 
    ```
    After the container starts run the following commands:
4. Run Migrations
    ```
    docker compose exec nextjs npm run db:generate
    docker compose exec nextjs npm run db:migrate
    ```
    Enjoy
    