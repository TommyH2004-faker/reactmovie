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
import {
  BY_MONTH,
  BY_YEAR,
  BY_LASTEST_3_DAYS,
  BY_LASTEST_7_DAYS,
  BY_LASTEST_15_DAYS,
  BY_LASTEST_30_DAYS} from "./Labels";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [chartType, setChartType] = useState("monthly");
  const [year, setYear] = useState(new Date().getFullYear() + "");
  const [latestDate, setLatestDate] = useState("3");
  const [labels, setLabels] = useState(BY_MONTH);
  const [topMovies, setTopMovies] = useState<any[]>([]);

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
    []
  );

  useEffect(() => {
    updateData(chartType, year);
  }, [year, chartType, updateData]);

  useEffect(() => {
    // Gọi API lấy 3 phim nhiều view nhất
    const fetchTopMovies = async () => {
      try {
        const res = await import("../../../../api/movieApi");
        if (res.get3PhimXemNhieu) {
          const result = await res.get3PhimXemNhieu();
          setTopMovies(result);
        } else if (res.getAllMovies) {
          const result = await res.getAllMovies(0, 3);
          setTopMovies(result.ketQua);
        }
      } catch (error) {
        setTopMovies([]);
      }
    };
    fetchTopMovies();
  }, []);

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

  return (
    <div className='container p-4 '>
      <div className='row'>
        <div className='col-lg-6 col-md-12 col-sm-12'>
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
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <div className='shadow-4 rounded p-5 mb-5 bg-light'>
            <h4 className='text-black text-center mb-3'>
              Top phim nổi bật
              <hr />
            </h4>
            <div className='row flex-column'>
              {topMovies.length === 0 ? (
                <div className='text-center w-100'>Không có dữ liệu</div>
              ) : (
                topMovies.map((movie) => (
                  <div className='col-12 mb-4' key={movie.id}>
                    <div
                      className='card h-100 d-flex flex-row align-items-center shadow-sm border-0 top-movie-card'
                      style={{
                        cursor: 'pointer',
                        borderRadius: '16px',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                      }}
                      onClick={() => navigate(`/movies/${movie.id}`)}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className='card-img-left'
                        style={{
                          height: '120px',
                          width: '90px',
                          objectFit: 'cover',
                          borderRadius: '12px',
                          margin: '16px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
                        }}
                      />
                      <div className='card-body d-flex flex-column justify-content-center align-items-start p-3'>
                        <h6 className='card-title mb-2 fw-bold' style={{fontSize: '1.1rem', color: '#222'}}>{movie.title}</h6>
                        <p className='card-text mb-0' style={{fontSize: '1rem', color: '#666'}}>Lượt xem: <span style={{fontWeight: 600, color: '#e74c3c'}}>{movie.views}</span></p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
