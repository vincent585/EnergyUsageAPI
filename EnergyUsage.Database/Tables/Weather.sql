CREATE TABLE [dbo].[Weather]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Date] DATETIME NOT NULL, 
    [Temperature] DECIMAL(5,2) NOT NULL, 
    [AverageHumidity] DECIMAL(3,2) NOT NULL
)
