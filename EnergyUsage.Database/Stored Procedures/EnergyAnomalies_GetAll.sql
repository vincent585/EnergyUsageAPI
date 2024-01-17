CREATE PROCEDURE [dbo].[EnergyAnomalies_GetAll]

AS
SELECT ea.Time, ea.Consumption FROM EnergyAnomalies ea
