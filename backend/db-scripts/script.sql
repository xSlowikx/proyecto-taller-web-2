USE [master]
GO
/****** Object:  Database [to-do-app]    Script Date: 22/11/2024 22:00:57 ******/
CREATE DATABASE [to-do-app]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'to-do-app', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\to-do-app.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'to-do-app_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\to-do-app_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [to-do-app] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [to-do-app].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [to-do-app] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [to-do-app] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [to-do-app] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [to-do-app] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [to-do-app] SET ARITHABORT OFF 
GO
ALTER DATABASE [to-do-app] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [to-do-app] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [to-do-app] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [to-do-app] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [to-do-app] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [to-do-app] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [to-do-app] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [to-do-app] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [to-do-app] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [to-do-app] SET  DISABLE_BROKER 
GO
ALTER DATABASE [to-do-app] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [to-do-app] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [to-do-app] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [to-do-app] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [to-do-app] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [to-do-app] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [to-do-app] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [to-do-app] SET RECOVERY FULL 
GO
ALTER DATABASE [to-do-app] SET  MULTI_USER 
GO
ALTER DATABASE [to-do-app] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [to-do-app] SET DB_CHAINING OFF 
GO
ALTER DATABASE [to-do-app] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [to-do-app] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [to-do-app] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [to-do-app] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'to-do-app', N'ON'
GO
ALTER DATABASE [to-do-app] SET QUERY_STORE = ON
GO
ALTER DATABASE [to-do-app] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [to-do-app]
GO
/****** Object:  User [third_party_apps]    Script Date: 22/11/2024 22:00:57 ******/
CREATE USER [third_party_apps] FOR LOGIN [third_party_apps] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_datareader] ADD MEMBER [third_party_apps]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [third_party_apps]
GO
/****** Object:  Table [dbo].[priority]    Script Date: 22/11/2024 22:00:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[priority](
	[priority_id] [int] IDENTITY(1,1) NOT NULL,
	[value] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_priority] PRIMARY KEY CLUSTERED 
(
	[priority_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[state]    Script Date: 22/11/2024 22:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[state](
	[id_estado] [int] IDENTITY(1,1) NOT NULL,
	[descripcion_estado] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_estado_tarea] PRIMARY KEY CLUSTERED 
(
	[id_estado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[task]    Script Date: 22/11/2024 22:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task](
	[id_task] [int] IDENTITY(1,1) NOT NULL,
	[title] [nvarchar](50) NOT NULL,
	[description] [text] NOT NULL,
	[created_at] [datetime] NOT NULL,
	[modified_at] [datetime] NULL,
	[completed_at] [datetime] NULL,
	[priority_id] [int] NOT NULL,
	[state_id] [int] NOT NULL,
 CONSTRAINT [PK_task] PRIMARY KEY CLUSTERED 
(
	[id_task] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[task_owner]    Script Date: 22/11/2024 22:00:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[task_owner](
	[id_user] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[apellido] [nvarchar](50) NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[priority] ON 

INSERT [dbo].[priority] ([priority_id], [value]) VALUES (1, N'Urgente')
INSERT [dbo].[priority] ([priority_id], [value]) VALUES (2, N'Normal')
INSERT [dbo].[priority] ([priority_id], [value]) VALUES (3, N'Baja')
SET IDENTITY_INSERT [dbo].[priority] OFF
GO
SET IDENTITY_INSERT [dbo].[state] ON 

INSERT [dbo].[state] ([id_estado], [descripcion_estado]) VALUES (2, N'En progreso')
INSERT [dbo].[state] ([id_estado], [descripcion_estado]) VALUES (4, N'Finalizada')
INSERT [dbo].[state] ([id_estado], [descripcion_estado]) VALUES (5, N'Eliminada')
SET IDENTITY_INSERT [dbo].[state] OFF
GO
SET IDENTITY_INSERT [dbo].[task] ON 

INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (1, N'Updating title attribute', N'Updatin description attribute', CAST(N'2024-11-13T22:34:42.120' AS DateTime), CAST(N'2024-11-14T02:15:59.467' AS DateTime), CAST(N'2024-11-14T02:08:32.597' AS DateTime), 2, 5)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (2, N'This wont be deleted xd', N'Not deleteable', CAST(N'2024-11-13T23:18:21.350' AS DateTime), CAST(N'2024-11-23T00:15:38.747' AS DateTime), NULL, 3, 5)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (3, N'Creado desde postman', N'A ver si anda todo', CAST(N'2024-11-19T20:54:57.610' AS DateTime), CAST(N'2024-11-23T00:58:00.160' AS DateTime), NULL, 1, 2)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (5, N'No tomar azucar', N'La azucar retiene liquidos', CAST(N'2024-11-22T21:14:12.953' AS DateTime), CAST(N'2024-11-23T00:17:22.440' AS DateTime), NULL, 2, 5)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (6, N'No creer en mi palabra', N'No siempre tengo razon', CAST(N'2024-11-22T21:14:26.030' AS DateTime), CAST(N'2024-11-23T00:21:23.637' AS DateTime), NULL, 1, 5)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (7, N'Gladiador 2', N'Peliculón', CAST(N'2024-11-22T21:14:39.427' AS DateTime), CAST(N'2024-11-23T00:16:56.847' AS DateTime), NULL, 1, 5)
INSERT [dbo].[task] ([id_task], [title], [description], [created_at], [modified_at], [completed_at], [priority_id], [state_id]) VALUES (8, N'Criticar a la sustancia', N'La sustancia es la pelicula del Dr. Chiflado pero del 2024', CAST(N'2024-11-22T21:14:55.657' AS DateTime), CAST(N'2024-11-23T00:56:46.883' AS DateTime), CAST(N'2024-11-23T00:56:46.883' AS DateTime), 2, 4)
SET IDENTITY_INSERT [dbo].[task] OFF
GO
SET IDENTITY_INSERT [dbo].[task_owner] ON 

INSERT [dbo].[task_owner] ([id_user], [nombre], [apellido]) VALUES (1, N'Eliana', N'Navarro')
INSERT [dbo].[task_owner] ([id_user], [nombre], [apellido]) VALUES (2, N'Alejandro', N'Rios')
INSERT [dbo].[task_owner] ([id_user], [nombre], [apellido]) VALUES (3, N'Ornella', N'Alonso')
INSERT [dbo].[task_owner] ([id_user], [nombre], [apellido]) VALUES (4, N'Lautaro', N'Baez')
SET IDENTITY_INSERT [dbo].[task_owner] OFF
GO
ALTER TABLE [dbo].[task] ADD  CONSTRAINT [DF_task_created_at]  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[task] ADD  CONSTRAINT [DF_task_priority_id]  DEFAULT ((3)) FOR [priority_id]
GO
ALTER TABLE [dbo].[task] ADD  CONSTRAINT [DF_task_state_id]  DEFAULT ((2)) FOR [state_id]
GO
ALTER TABLE [dbo].[task]  WITH CHECK ADD  CONSTRAINT [FK_task_state] FOREIGN KEY([state_id])
REFERENCES [dbo].[state] ([id_estado])
GO
ALTER TABLE [dbo].[task] CHECK CONSTRAINT [FK_task_state]
GO
USE [master]
GO
ALTER DATABASE [to-do-app] SET  READ_WRITE 
GO
