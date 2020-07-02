FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build

RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm
RUN npm config set strict-ssl false

WORKDIR /src
COPY ["nuget.config", ""]
COPY ["src/Intalex.NetCore.Angular.SPA/Intalex.NetCore.Angular.SPA.csproj", "src/Intalex.NetCore.Angular.SPA/"]
RUN dotnet restore "src/Intalex.NetCore.Angular.SPA/Intalex.NetCore.Angular.SPA.csproj"
WORKDIR /
COPY . .

WORKDIR "/src/Intalex.NetCore.Angular.SPA"
RUN npm install
RUN npm rebuild node-sass
RUN npm run compile
RUN npm config set strict-ssl true

ARG build_version
RUN dotnet build "Intalex.NetCore.Angular.SPA.csproj" -c Release -o /app /p:Version=${build_version}

FROM build AS publish
ARG build_version
RUN dotnet publish "Intalex.NetCore.Angular.SPA.csproj" -c Release -o /app /p:Version=${build_version}

FROM base AS final
LABEL Description="Website | Intalex"
LABEL Vendor="Intalex Technologies"
LABEL Maintaner="Scott Florisson"
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Intalex.NetCore.Angular.SPA.dll"]