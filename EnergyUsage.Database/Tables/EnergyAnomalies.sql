CREATE TABLE [dbo].[EnergyAnomalies]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Time] DATETIME NOT NULL, 
    [Consumption] FLOAT(24) NOT NULL
)
