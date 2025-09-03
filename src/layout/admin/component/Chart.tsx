import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import MovieIcon from "@mui/icons-material/Movie";

// Labels cho biểu đồ
export const BY_YEAR = [2022, 2023, 2024, 2025];
export const BY_MONTH = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];
export const BY_LASTEST_3_DAYS = ["3 ngày trước", "2 ngày trước", "Hôm qua"];
export const BY_LASTEST_7_DAYS = ["7 ngày trước", "6 ngày trước", "5 ngày trước", "4 ngày trước", "3 ngày trước", "2 ngày trước", "Hôm qua"];
export const BY_LASTEST_15_DAYS = Array.from({length: 15}, (_, i) => `${15-i} ngày trước`);
export const BY_LASTEST_30_DAYS = Array.from({length: 30}, (_, i) => `${30-i} ngày trước`);
export function formatDate(date: Date) {
  // Tùy chỉnh format cho movie
  return date.toLocaleDateString();
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Biểu đồ thống kê phim",
    },
  },
};

interface ChartProps {
  dataTotalViewByMonth?: number[];
  dataNumberOfMovieByMonth?: number[];
  movies?: any[];
}

export const Chart: React.FC<ChartProps> = (props) => {
  const [chartType, setChartType] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear() + "");
  const [latestDate, setLatestDate] = useState("3");
  const [labels, setLabels] = useState(BY_MONTH);

  function handleChangeChartType(event: SelectChangeEvent<string>): void {
    setChartType(event.target.value);
    if (event.target.value === "yearly") {
      setLabels(BY_YEAR.map(String));
      updateData(event.target.value);
    }
    if (event.target.value === "monthly") {
      setLabels(BY_MONTH);
      updateData(event.target.value, new Date().getFullYear() + "");
    }
    if (event.target.value === "daily") {
      setLabels(BY_LASTEST_3_DAYS);
      setLatestDate("3");
      updateData(event.target.value, new Date().getFullYear() + "", BY_LASTEST_3_DAYS);
    }
  }

  function handleChangeLatestDate(event: SelectChangeEvent<string>): void {
    setLatestDate(event.target.value);
    switch (event.target.value) {
      case "3":
        updateData(chartType, new Date().getFullYear() + "", BY_LASTEST_3_DAYS);
        setLabels(BY_LASTEST_3_DAYS);
        break;
      case "7":
        updateData(chartType, new Date().getFullYear() + "", BY_LASTEST_7_DAYS);
        setLabels(BY_LASTEST_7_DAYS);
        break;
      case "15":
        updateData(chartType, new Date().getFullYear() + "", BY_LASTEST_15_DAYS);
        setLabels(BY_LASTEST_15_DAYS);
        break;
      case "30":
        updateData(chartType, new Date().getFullYear() + "", BY_LASTEST_30_DAYS);
        setLabels(BY_LASTEST_30_DAYS);
        break;
      default:
        break;
    }
  }

  function handleChangeYear(event: SelectChangeEvent<string>): void {
    setYear(event.target.value);
    updateData(chartType, event.target.value);
  }

  const dataNumberOfMovie = useRef(new Array(12).fill(0));
  const dataTotalView = useRef(new Array(12).fill(0));

  const updateData = useMemo(
    () => (option: string, year?: string, latestDays?: string[]) => {
      switch (option) {
        case "yearly":
          // Tùy chỉnh cho movie
          break;
        case "monthly":
          // Tùy chỉnh cho movie
          break;
        case "daily":
          // Tùy chỉnh cho movie
          break;
        default:
          break;
      }
    },
    [props.movies]
  );

  useEffect(() => {
    updateData(chartType, year);
  }, [year, chartType, updateData]);

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng số phim",
        data: dataNumberOfMovie.current,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tổng lượt xem",
        data: dataTotalView.current,
        borderColor: "rgb(12, 99, 132)",
        backgroundColor: "rgba(12, 99, 132, 0.5)",
      },
    ],
  };

  // PieChart cho trạng thái phim (ví dụ: đang chiếu, đã chiếu...)
  const [showing, setShowing] = useState(0);
  const [ended, setEnded] = useState(0);

  useEffect(() => {
    // Tùy chỉnh cho movie
    let total = props.movies?.length || 0;
    let showingTotal = 0;
    let endedTotal = 0;
    props.movies?.forEach((movie) => {
      if (movie.status === "Đang chiếu") {
        showingTotal++;
      } else if (movie.status === "Đã chiếu") {
        endedTotal++;
      }
    });
    setShowing((showingTotal / total) * 100);
    setEnded((endedTotal / total) * 100);
  }, [props.movies]);

  return (
    <div className='container p-4 '>
      <div className='row'>
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className='shadow-4 rounded py-5 mb-5 bg-light'>
            <h4 className='text-black text-center mb-3 pb-3'>
              Biểu đồ trạng thái phim
              <hr />
            </h4>
            <PieChart
              series={[
                {
                  data: [
                    {
                      value: showing,
                      label: "Đang chiếu",
                      color: "#4db44d",
                    },
                    {
                      value: ended,
                      label: "Đã chiếu",
                      color: "#e03c3c",
                    },
                  ],
                  highlightScope: {
                    fade: "global",
                    highlight: "series"
                  },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  arcLabel: (item) => `${item.value.toFixed(0)}%`,
                },
              ]}
              width={500}
              height={250}
            />
          </div>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className='shadow-4 rounded p-5 mb-5 bg-light'>
            <h4 className='text-black text-center mb-3'>
              Top phim nổi bật
              <hr />
            </h4>
            {/* Thêm component TopMovie nếu có */}
            <MovieIcon fontSize='large' color='secondary' />
          </div>
        </div>
      </div>
      <div className='shadow-4 rounded p-5 d-flex align-items-end flex-column bg-light'>
        <div className='d-flex'>
          <FormControl sx={{ m: 1, minWidth: 170 }} size='small'>
            <InputLabel id='demo-select-small-label'>Thống kê theo</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={chartType}
              label='Thống kê theo'
              onChange={handleChangeChartType}
            >
              <MenuItem value={'yearly'}>Hàng năm</MenuItem>
              <MenuItem value={'monthly'}>Hàng tháng</MenuItem>
              <MenuItem value={'daily'}>Hàng ngày</MenuItem>
            </Select>
          </FormControl>
          {chartType === "daily" && (
            <FormControl sx={{ m: 1, minWidth: 170 }} size='small'>
              <InputLabel id='demo-select-small-label'>Lọc theo</InputLabel>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={latestDate}
                label='Lọc theo'
                onChange={handleChangeLatestDate}
              >
                <MenuItem value={'3'}>3 ngày gần đây</MenuItem>
                <MenuItem value={'7'}>7 ngày gần đây</MenuItem>
                <MenuItem value={'15'}>15 ngày gần đây</MenuItem>
                <MenuItem value={'30'}>30 ngày gần đây</MenuItem>
              </Select>
            </FormControl>
          )}
          {chartType === "monthly" && (
            <FormControl sx={{ m: 1, minWidth: 170 }} size='small'>
              <InputLabel id='demo-select-small-label'>Năm</InputLabel>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={year}
                label='Năm'
                onChange={handleChangeYear}
              >
                {BY_YEAR.map((y) => (
                  <MenuItem key={y} value={`${y}`}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};
