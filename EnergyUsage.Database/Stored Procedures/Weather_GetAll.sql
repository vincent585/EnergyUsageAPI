CREATE PROCEDURE [dbo].[Weather_GetAll]

AS
SELECT w.Date, w.Temperature, w.AverageHumidity FROM Weather w

