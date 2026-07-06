@echo off
setlocal

:: Directories
set "PROJECT_DIR=LibraryManagement"
set "LIB_DIR=%PROJECT_DIR%\lib"
set "BIN_DIR=%PROJECT_DIR%\bin"
set "SRC_DIR=%PROJECT_DIR%\src\main\java"
set "RESOURCES_DIR=%PROJECT_DIR%\src\main\resources"

:: Create lib and bin directories if they don't exist
if not exist "%LIB_DIR%" mkdir "%LIB_DIR%"
if not exist "%BIN_DIR%" mkdir "%BIN_DIR%"

:: Try to copy dependencies from Exercise 1 first to save download time
set "EX1_LIB=..\Exercise1_Spring_Config\LibraryManagement\lib"

if not exist "%LIB_DIR%\spring-core-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-core-5.3.31.jar" (
        echo Copying spring-core-5.3.31.jar from Exercise 1...
        copy "%EX1_LIB%\spring-core-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading spring-core-5.3.31.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-core/5.3.31/spring-core-5.3.31.jar' -OutFile '%LIB_DIR%\spring-core-5.3.31.jar'"
    )
)
if not exist "%LIB_DIR%\spring-beans-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-beans-5.3.31.jar" (
        echo Copying spring-beans-5.3.31.jar from Exercise 1...
        copy "%EX1_LIB%\spring-beans-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading spring-beans-5.3.31.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-beans/5.3.31/spring-beans-5.3.31.jar' -OutFile '%LIB_DIR%\spring-beans-5.3.31.jar'"
    )
)
if not exist "%LIB_DIR%\spring-context-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-context-5.3.31.jar" (
        echo Copying spring-context-5.3.31.jar from Exercise 1...
        copy "%EX1_LIB%\spring-context-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading spring-context-5.3.31.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-context/5.3.31/spring-context-5.3.31.jar' -OutFile '%LIB_DIR%\spring-context-5.3.31.jar'"
    )
)
if not exist "%LIB_DIR%\spring-expression-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-expression-5.3.31.jar" (
        echo Copying spring-expression-5.3.31.jar from Exercise 1...
        copy "%EX1_LIB%\spring-expression-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading spring-expression-5.3.31.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-expression/5.3.31/spring-expression-5.3.31.jar' -OutFile '%LIB_DIR%\spring-expression-5.3.31.jar'"
    )
)
if not exist "%LIB_DIR%\spring-aop-5.3.31.jar" (
    if exist "%EX1_LIB%\spring-aop-5.3.31.jar" (
        echo Copying spring-aop-5.3.31.jar from Exercise 1...
        copy "%EX1_LIB%\spring-aop-5.3.31.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading spring-aop-5.3.31.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/springframework/spring-aop/5.3.31/spring-aop-5.3.31.jar' -OutFile '%LIB_DIR%\spring-aop-5.3.31.jar'"
    )
)
if not exist "%LIB_DIR%\commons-logging-1.2.jar" (
    if exist "%EX1_LIB%\commons-logging-1.2.jar" (
        echo Copying commons-logging-1.2.jar from Exercise 1...
        copy "%EX1_LIB%\commons-logging-1.2.jar" "%LIB_DIR%\" > nul
    ) else (
        echo Downloading commons-logging-1.2.jar...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/commons-logging/commons-logging/1.2/commons-logging-1.2.jar' -OutFile '%LIB_DIR%\commons-logging-1.2.jar'"
    )
)

:: Compile
echo Compiling Spring application...
set "CP=%LIB_DIR%\spring-core-5.3.31.jar;%LIB_DIR%\spring-beans-5.3.31.jar;%LIB_DIR%\spring-context-5.3.31.jar;%LIB_DIR%\spring-expression-5.3.31.jar;%LIB_DIR%\spring-aop-5.3.31.jar;%LIB_DIR%\commons-logging-1.2.jar"
javac -cp "%CP%" -d "%BIN_DIR%" "%SRC_DIR%\com\library\repository\BookRepository.java" "%SRC_DIR%\com\library\service\BookService.java" "%SRC_DIR%\com\library\LibraryManagementApplication.java"
if %errorlevel% neq 0 (
    echo Compilation failed!
    exit /b %errorlevel%
)

:: Run
echo Running Spring application...
java -cp "%BIN_DIR%;%RESOURCES_DIR%;%CP%" com.library.LibraryManagementApplication

endlocal
