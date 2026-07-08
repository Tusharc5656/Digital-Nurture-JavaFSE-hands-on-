@echo off
setlocal

:: =============================================================
::   Exercise 4: Creating and Configuring a Maven Project
::   Library Management System - Build and Run Script
::
::   This script simulates what Maven would do:
::     1. Resolves Spring dependencies (context, aop, webmvc)
::     2. Compiles Java source files (targeting Java 1.8)
::     3. Runs LibraryManagementApplication
:: =============================================================

:: ---- Directory Layout (mirrors Maven Standard Directory Layout) ----
set "PROJECT_DIR=LibraryManagement"
set "LIB_DIR=%PROJECT_DIR%\lib"
set "BIN_DIR=%PROJECT_DIR%\bin"
set "SRC_DIR=%PROJECT_DIR%\src\main\java"
set "RESOURCES_DIR=%PROJECT_DIR%\src\main\resources"

:: Create output directories if they don't exist
if not exist "%LIB_DIR%" mkdir "%LIB_DIR%"
if not exist "%BIN_DIR%" mkdir "%BIN_DIR%"

:: ---- Reuse jars from previous exercises to save download time ----
set "EX1_LIB=..\Exercise1_Spring_Config\LibraryManagement\lib"
set "EX2_LIB=..\Exercise2_Dependency_Injection\LibraryManagement\lib"

:: Helper: copy or download a jar
:: Usage: copy_or_download <jar_name> <maven_url>

echo =============================================================
echo   Exercise 4: Resolving Maven Dependencies (pom.xml)
echo =============================================================
echo   spring-context  (Spring IoC Container ^& ApplicationContext)
echo   spring-aop      (Aspect-Oriented Programming support)
echo   spring-webmvc   (DispatcherServlet ^& MVC Controllers)
echo =============================================================
echo.

:: ---- spring-core ----
if not exist "%LIB_DIR%\spring-core-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-core-5.3.31.jar" (
        echo [Maven] Resolved spring-core-5.3.31.jar from local cache...
        copy "%EX1_LIB%\spring-core-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\spring-core-5.3.31.jar" (
        echo [Maven] Resolved spring-core-5.3.31.jar from local cache...
        copy "%EX2_LIB%\spring-core-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading spring-core-5.3.31.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-core/5.3.31/spring-core-5.3.31.jar' -OutFile '%LIB_DIR%\spring-core-5.3.31.jar'"
    )
)

:: ---- spring-beans ----
if not exist "%LIB_DIR%\spring-beans-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-beans-5.3.31.jar" (
        echo [Maven] Resolved spring-beans-5.3.31.jar from local cache...
        copy "%EX1_LIB%\spring-beans-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\spring-beans-5.3.31.jar" (
        echo [Maven] Resolved spring-beans-5.3.31.jar from local cache...
        copy "%EX2_LIB%\spring-beans-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading spring-beans-5.3.31.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-beans/5.3.31/spring-beans-5.3.31.jar' -OutFile '%LIB_DIR%\spring-beans-5.3.31.jar'"
    )
)

:: ---- spring-context (declared in pom.xml) ----
if not exist "%LIB_DIR%\spring-context-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-context-5.3.31.jar" (
        echo [Maven] Resolved spring-context-5.3.31.jar from local cache...
        copy "%EX1_LIB%\spring-context-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\spring-context-5.3.31.jar" (
        echo [Maven] Resolved spring-context-5.3.31.jar from local cache...
        copy "%EX2_LIB%\spring-context-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading spring-context-5.3.31.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-context/5.3.31/spring-context-5.3.31.jar' -OutFile '%LIB_DIR%\spring-context-5.3.31.jar'"
    )
)

:: ---- spring-expression ----
if not exist "%LIB_DIR%\spring-expression-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-expression-5.3.31.jar" (
        echo [Maven] Resolved spring-expression-5.3.31.jar from local cache...
        copy "%EX1_LIB%\spring-expression-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\spring-expression-5.3.31.jar" (
        echo [Maven] Resolved spring-expression-5.3.31.jar from local cache...
        copy "%EX2_LIB%\spring-expression-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading spring-expression-5.3.31.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-expression/5.3.31/spring-expression-5.3.31.jar' -OutFile '%LIB_DIR%\spring-expression-5.3.31.jar'"
    )
)

:: ---- spring-aop (declared in pom.xml) ----
if not exist "%LIB_DIR%\spring-aop-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-aop-5.3.31.jar" (
        echo [Maven] Resolved spring-aop-5.3.31.jar from local cache...
        copy "%EX1_LIB%\spring-aop-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\spring-aop-5.3.31.jar" (
        echo [Maven] Resolved spring-aop-5.3.31.jar from local cache...
        copy "%EX2_LIB%\spring-aop-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading spring-aop-5.3.31.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-aop/5.3.31/spring-aop-5.3.31.jar' -OutFile '%LIB_DIR%\spring-aop-5.3.31.jar'"
    )
)

:: ---- spring-webmvc (declared in pom.xml) ----
if not exist "%LIB_DIR%\spring-webmvc-5.3.31.jar" (
    echo [Maven] Downloading spring-webmvc-5.3.31.jar from Maven Central...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-webmvc/5.3.31/spring-webmvc-5.3.31.jar' -OutFile '%LIB_DIR%\spring-webmvc-5.3.31.jar'"
)

:: ---- spring-web (transitive dependency of spring-webmvc) ----
if not exist "%LIB_DIR%\spring-web-5.3.31.jar" (
    echo [Maven] Downloading spring-web-5.3.31.jar from Maven Central...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-web/5.3.31/spring-web-5.3.31.jar' -OutFile '%LIB_DIR%\spring-web-5.3.31.jar'"
)

:: ---- commons-logging (transitive dependency) ----
if not exist "%LIB_DIR%\commons-logging-1.2.jar" (
    if exist "%EX1_LIB%\commons-logging-1.2.jar" (
        echo [Maven] Resolved commons-logging-1.2.jar from local cache...
        copy "%EX1_LIB%\commons-logging-1.2.jar" "%LIB_DIR%\" > nul
    ) else if exist "%EX2_LIB%\commons-logging-1.2.jar" (
        echo [Maven] Resolved commons-logging-1.2.jar from local cache...
        copy "%EX2_LIB%\commons-logging-1.2.jar" "%LIB_DIR%\" > nul
    ) else (
        echo [Maven] Downloading commons-logging-1.2.jar from Maven Central...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/commons-logging/commons-logging/1.2/commons-logging-1.2.jar' -OutFile '%LIB_DIR%\commons-logging-1.2.jar'"
    )
)

echo.
echo [Maven] All dependencies resolved successfully.
echo.

:: ---- Build Classpath ----
set "CP=%LIB_DIR%\spring-core-5.3.31.jar;%LIB_DIR%\spring-beans-5.3.31.jar;%LIB_DIR%\spring-context-5.3.31.jar;%LIB_DIR%\spring-expression-5.3.31.jar;%LIB_DIR%\spring-aop-5.3.31.jar;%LIB_DIR%\spring-webmvc-5.3.31.jar;%LIB_DIR%\spring-web-5.3.31.jar;%LIB_DIR%\commons-logging-1.2.jar"

:: ---- Compile (equivalent to: mvn compile, using Java 1.8 source/target) ----
echo [Maven] maven-compiler-plugin:3.11.0:compile (source=1.8 target=1.8)
echo [Maven] Compiling source files in %SRC_DIR%...
javac -source 1.8 -target 1.8 -cp "%CP%" -d "%BIN_DIR%" ^
    "%SRC_DIR%\com\library\repository\BookRepository.java" ^
    "%SRC_DIR%\com\library\service\BookService.java" ^
    "%SRC_DIR%\com\library\LibraryManagementApplication.java"

if %errorlevel% neq 0 (
    echo.
    echo [Maven] BUILD FAILURE - Compilation errors detected!
    exit /b %errorlevel%
)

echo [Maven] BUILD SUCCESS - Compilation complete.
echo.

:: ---- Run (equivalent to: mvn exec:java) ----
echo [Maven] Executing com.library.LibraryManagementApplication...
echo.
java -cp "%BIN_DIR%;%RESOURCES_DIR%;%CP%" com.library.LibraryManagementApplication

echo.
echo [Maven] Execution complete.
endlocal
