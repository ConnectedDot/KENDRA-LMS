import React, { useContext } from "react";
import { AuthContext } from "../../context";
import { getLoginToken } from "../../storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-Instance";
import { queryKeys } from "../../react-query/constants";
import { useNavigate } from "react-router-dom";

const SERVER_ERROR = "There was an error contacting the server.";
