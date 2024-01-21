CREATE PROCEDURE dbo.Weather_GetPaged
    @PageSize INT,
    @Page INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;
    
    SELECT
        date,
        temperature,
        averageHumidity
    FROM
        Weather
    ORDER BY
        date -- You can order by a suitable column, adjust as needed
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
