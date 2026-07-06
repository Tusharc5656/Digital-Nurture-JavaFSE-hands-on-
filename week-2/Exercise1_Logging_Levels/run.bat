@echo off
setlocal

:: Create lib directory if it doesn't exist
if not exist lib mkdir lib

:: Download slf4j-api
if not exist lib\slf4j-api-1.7.30.jar (
    echo Downloading slf4j-api-1.7.30.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.30/slf4j-api-1.7.30.jar' -OutFile 'lib\slf4j-api-1.7.30.jar'"
)

:: Download logback-classic
if not exist lib\logback-classic-1.2.3.jar (
    echo Downloading logback-classic-1.2.3.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/ch/qos/logback/logback-classic/1.2.3/logback-classic-1.2.3.jar' -OutFile 'lib\logback-classic-1.2.3.jar'"
)

:: Download logback-core
if not exist lib\logback-core-1.2.3.jar (
    echo Downloading logback-core-1.2.3.jar...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/ch/qos/logback/logback-core/1.2.3/logback-core-1.2.3.jar' -OutFile 'lib\logback-core-1.2.3.jar'"
)

:: Compile the Java class
echo Compiling LoggingExample.java...
javac -cp "lib\slf4j-api-1.7.30.jar;lib\logback-classic-1.2.3.jar;lib\logback-core-1.2.3.jar" LoggingExample.java
if %errorlevel% neq 0 (
    echo Compilation failed!
    exit /b %errorlevel%
)

:: Run the Java class
echo Running LoggingExample...
java -cp ".;lib\slf4j-api-1.7.30.jar;lib\logback-classic-1.2.3.jar;lib\logback-core-1.2.3.jar" LoggingExample

endlocal
