import styled from 'styled-components';
import { VictoryChart, VictoryHistogram, VictoryStack, VictoryAxis, VictoryLegend, VictoryBar, VictoryLabel, VictoryLine, VictoryScatter } from 'victory';

export const NewsletterContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 4px;
    font-family: 'Droid Serif', serif;
    font-size: 14px;
    color: #2E2E2E;
    background-color: #ECECDF;
`;

export const NewsletterTitle = styled.h1`
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
    line-height: 72px;
    margin-bottom: 10px;
    max-width: 100%;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 40px; /* Adjust the font size for small screens */
        line-height: 36px; /* Adjust the line height accordingly */
    }
`;

export const DateBar = styled.div`
    text-transform: uppercase;
    border-bottom: 2px solid #2E2E2E;
    border-top: 2px solid #2E2E2E;
    padding: 12px 0 12px 0;
    text-align: center;
`;


export const ArticleHeader = styled.h2`
    font-weight: 500;
    font-style: italic;
    font-size: 30px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;
`;

export const ArticleSubheader = styled.div`
    font-weight: 700;
    font-size: 18px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;

    &:before {
        border-top: 1px solid #2E2E2E;
        content: '';
        width: 100px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid #2E2E2E;
        content: '';
        width: 100px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }
`;


export const StyledTable = styled.table`
    table-layout: auto;
    max-width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #000;
        padding: 5px; /* Add padding to th and td */
        text-align: left; /* Align text to the left */
    }

    th {
        color: #2E2E2E;
        background-color: #d6d6d6;
    }

    .wrap-cell {
        white-space: normal;
        word-break: break-word;
    }

    .center-column {
        text-align: center;
    }
`;

export const ArticleBlock = styled.div`
    padding: 4px;
    margin: 4px;
    max-width: calc(100% - 8px); /* Consider padding and margin within max-width */
    border: 1px solid #ccc;
`;

export const ImageWrapper = styled.div`
    max-width: 100%; // Limit the image width to its container
    overflow: hidden; // Hide any overflow if the image exceeds the container's width
`;

export const ArticleImage = styled.img`
    max-width: 100%; // Make the image responsive to its container's width
`;


const AwardsTable = ({ awardsData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Superlative</th>
                    <th>Winner + Description</th>
                </tr>
            </thead>
            <tbody>
                {awardsData.map((award, index) => (
                    <tr key={index}>
                        <td>{award.Superlative}</td>
                        <td>{award["Winner + Description"]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export default AwardsTable;


export const BarChart = ({ chartData }) => {
    const teamNames = chartData.map(item => item.team_name);
    const maxPoints = chartData.map(item => item.max_points);
    const actualPoints = chartData.map(item => item.actual_points);

    const data = teamNames.map((name, index) => ({
        team_name: name,
        'Actual Points': actualPoints[index],
        'Max Points': maxPoints[index],
        'Percentage': actualPoints[index] / maxPoints[index]
    }));

    return (
        <VictoryChart
            horizontal
        >
            <VictoryLegend x={100} y={10}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'Actual Points', symbol: { fill: '#20A4F4' } },
                    { name: 'Max Points', symbol: { fill: '#7D8491' } },
                ]}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{ data: { fill: '#7D8491' } }}
                data={data}
                x="team_name"
                y="Max Points"
                sortKey={"Actual Points"}
                sortOrder={"ascending"}
                labels={({ datum }) => `${(datum.Percentage * 100).toFixed(1)}%`}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{ data: { fill: '#20A4F4' } }}
                data={data}
                x="team_name"
                y="Actual Points"
                labels={({ datum }) => `${datum.team_name}`}
                labelComponent={<VictoryLabel x={45} />}
            />
            <VictoryAxis dependentAxis
                style={{ axis: { stroke: 'transparent' } }}
            />
        </VictoryChart >
    );
};


export const StackedHistogram = ({ chartData }) => {
    const maxScore = Math.ceil(Math.max(...chartData.map(entry => entry.team_points)));
    const minScore = Math.floor(Math.min(...chartData.map(entry => entry.team_points)));

    const bins = [];
    for (let i = minScore - 5; i <= maxScore; i += 5) {
        bins.push(Math.round(i / 5) * 5);
    }

    // Find the maximum week value
    const maxWeek = chartData.reduce((max, entry) => Math.max(max, entry.week), -Infinity);

    // Subset the data into two datasets
    const thisWeekData = chartData.filter(entry => entry.week === maxWeek);
    const historicData = chartData.filter(entry => entry.week !== maxWeek);

    return (
        <VictoryChart>
            <VictoryStack colorScale="qualitative">
                <VictoryHistogram
                    style={{ data: { fill: '#20A4F4' } }}
                    cornerRadius={3}
                    data={thisWeekData}
                    x="team_points"
                    bins={bins} />
                <VictoryHistogram
                    style={{ data: { fill: '#7D8491' } }}
                    cornerRadius={3}
                    data={historicData}
                    x="team_points"
                    bins={bins} />
            </VictoryStack>
            <VictoryAxis
                tickCount={Math.round(bins.length / 2.5)}
            />
            <VictoryAxis dependentAxis />
        </VictoryChart>
    );
};


export const WeeklyScoringChart = ({ chartData }) => {
    const data = chartData.map(({ week, team_points, Average, Median, Maximum, Minimum }) => ({
        week,
        team_points,
        Average,
        Median,
        Maximum,
        Minimum,
    }));

    return (
        <VictoryChart>
            <VictoryLegend
                x={50}
                y={10}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'Maximum', symbol: { fill: '#20A4F4' } },
                    { name: 'Average', symbol: { fill: '#668F80' } },
                    { name: 'Median', symbol: { fill: '#7E6551' } },
                    { name: 'Minimum', symbol: { fill: '#FF3366' } },
                ]}
            />
            <VictoryAxis dependentAxis
                tickValues={[50, 70, 90, 110, 130, 150, 170, 190]}
            />
            <VictoryAxis
                tickCount={data.length / 12}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Maximum"
                style={{ data: { stroke: '#20A4F4', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Average"
                style={{ data: { stroke: '#668F80', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Median"
                style={{ data: { stroke: '#7E6551', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Minimum"
                style={{ data: { stroke: '#FF3366', strokeWidth: 2 } }}
            />
            <VictoryScatter
                data={data}
                x="week"
                y="team_points"
            />
        </VictoryChart>
    );
};


// Define colors for each position
const colorsByPosition = {
    QB: '#E1676F',
    RB: '#11D677',
    WR: '#4DB6F0',
    TE: '#E9AC53',
    K: '#D959FF',
    DEF: '#65645A',
};

// Define the order for sorting positions
const positionOrder = ["QB", "RB", "WR", "TE", "K", "DEF"];

export const MatchupPlot = ({ data, matchupId }) => {
    // Filter data based on the provided matchupId
    const filteredData = data.filter((team) => team.matchup_id === matchupId);

    // Get unique positions for creating legend, sorted in reverse order
    const uniquePositions = positionOrder
        .filter((position) => filteredData.some((team) => team.entries.some((entry) => entry.position === position)))
        .reverse();

    return (
        <div>
            <VictoryChart
                domainPadding={{ x: 90, y: [20, 20] }} // Adjust the x and y domainPadding values
                padding={{ top: 20, bottom: 30, left: 50, right: 20 }}
            >
                <VictoryAxis
                    tickValues={filteredData.map((team, index) => index + 0.5)}
                    tickFormat={filteredData.map((team) => team.team_name)}
                />
                <VictoryAxis dependentAxis />
                <VictoryStack colorScale={Object.values(colorsByPosition)}>
                    {uniquePositions.flatMap((position) =>
                        filteredData.flatMap((team) =>
                            team.entries
                                .filter((entry) => entry.position === position)
                                .map((entry, index) => ({
                                    team_name: team.team_name,
                                    points: entry.points,
                                    full_name: entry.full_name,
                                    label: `${entry.points}`,
                                    position: entry.position,
                                    index, // Adding index for unique key
                                }))
                        )
                    ).map((entry) => (
                        <VictoryBar
                            key={entry.index}
                            data={[entry]}
                            x="team_name"
                            y="points"
                            barWidth={150}
                            style={{
                                data: {
                                    fill: colorsByPosition[entry.position],
                                    stroke: '#000',
                                    strokeWidth: 1,
                                },
                                labels: { fill: '#000' },
                            }}
                            labels={({ datum }) => `${datum.full_name} ${datum.label}`}
                            labelComponent={<CustomLabel />}
                        />
                    ))}
                </VictoryStack>
            </VictoryChart>
        </div>
    );
};

// Custom label component to position the label in the middle of the bar segment
const CustomLabel = (props) => {
    const { x, y, datum } = props;

    // Check if both full_name and label are defined before concatenating
    const labelContent = datum.full_name && datum.label ? `${datum.full_name} - ${datum.label}` : '';

    // Assuming points represent the height of the bar segment
    const points = datum.label || 0; // Use the points value from the label or default to 0

    // Define a threshold value for positioning the label outside the bar
    const threshold = 0;

    // Calculate the y position based on the threshold
    const yPos = points < threshold ? y - 15 : y + (2 * points) / 2 + 3;

    return (
        <g transform={`translate(${x}, ${yPos})`}>
            <text textAnchor="middle" fontSize={10} fill="#000">
                {labelContent}
            </text>
        </g>
    );
};


export const MotwTable = ({ motwHistoryData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Week</th>
                    <th>Winner Team</th>
                    <th>Winner Score</th>
                    <th>Loser Score</th>
                    <th>Loser Team</th>
                    <th># of Shots / Dogs</th>
                </tr>
            </thead>
            <tbody>
                {motwHistoryData.map((weekData, index) => (
                    <tr key={index}>
                        <td class="center-column">{weekData.Week}</td>
                        <td class="wrap-cell">
                            {weekData["Winner Team"]}
                        </td>
                        <td class="center-column"
                            style={{
                                backgroundColor: weekData.WinnerScoreColor
                            }}>
                            {weekData["Winner Score"]}
                        </td>
                        <td class="center-column"
                            style={{
                                backgroundColor: weekData.LoserScoreColor
                            }}>
                            {weekData["Loser Score"]}</td>
                        <td class="wrap-cell">{weekData["Loser Team"]}</td>
                        <td class="center-column"
                            style={{
                                backgroundColor: weekData.ShotsDogsColor
                            }}
                        >{weekData["# of Shots/Dogs"]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};