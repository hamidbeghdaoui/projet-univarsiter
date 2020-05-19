-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 19 mai 2020 à 13:35
-- Version du serveur :  10.1.29-MariaDB
-- Version de PHP :  7.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projet_universitaire`
--

-- --------------------------------------------------------

--
-- Structure de la table `affichage_groupe`
--

CREATE TABLE `affichage_groupe` (
  `id` int(11) NOT NULL,
  `id_publicationEtudiant` int(11) DEFAULT NULL,
  `id_groupe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `affichage_groupe`
--

INSERT INTO `affichage_groupe` (`id`, `id_publicationEtudiant`, `id_groupe`) VALUES
(1, 72, 1),
(2, 73, 1),
(3, 73, 2),
(4, 74, 1),
(5, 75, 1),
(6, 75, 2),
(7, 75, 7),
(8, 75, 8),
(9, 76, 1),
(10, 77, 1),
(11, 78, 10);

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

CREATE TABLE `departement` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  `matricule` varchar(50) NOT NULL,
  `password_inscription` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`id`, `nom`, `prenom`, `phone`, `email`, `role`, `image`, `matricule`, `password_inscription`) VALUES
(1, 'amin', 'chibani', '2324235', 'hamid@gmail.com', 'Affichage', '202004051152348853885.png', '111101', 'password'),
(2, 'amina', 'kamilia', '2435', 'dlzdjzs', 'archif', '202004051155139572821.jpeg', '111102', 'password');

-- --------------------------------------------------------

--
-- Structure de la table `dette`
--

CREATE TABLE `dette` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) DEFAULT NULL,
  `id_specialite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(11) NOT NULL,
  `matricule` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `password_inscription` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id`, `matricule`, `nom`, `prenom`, `phone`, `email`, `image`, `password_inscription`) VALUES
(1, '161632030174', 'hamid', 'beghdaoui', '1312323', 'hamid@gmail.com', '202003291340187762186.jpg', 'password'),
(2, '161632030175', 'walid', 'chibani', '23422324', 'walid@gmail.com', '202004281620389246583.jpg', 'password'),
(3, '161632030176', 'karim', 'beghdaoui', '324', 'cdo;l', '202004051538469425860.png', 'password'),
(4, '161632030177', 'molod', 'rahmani', '2442343', 'ckdml', NULL, 'password'),
(5, '161632030178', 'islam', 'aba', '06768795788', 'islam09@gmail.com', '202005081718277050033.jpg', 'password'),
(6, '17403632742', 'aba', 'abdenour', '13243546', 'ABA@gmail.com', NULL, '281589715677972'),
(7, '222', 'hamid', 'fariha', NULL, NULL, NULL, '971589715717029'),
(8, '131242424', 'beghdaoui', 'hamid', NULL, NULL, NULL, '731589872314839');

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id` int(11) NOT NULL,
  `nom_grp` varchar(10) NOT NULL,
  `id_section` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id`, `nom_grp`, `id_section`) VALUES
(1, 'A1', 1),
(2, 'A2', 1),
(3, 'A1', 3),
(4, 'A2', 3),
(5, 'A1', 5),
(6, 'A2', 5),
(7, 'B1', 2),
(8, 'b2', 2),
(9, 'B1', 4),
(10, 'B2', 4),
(11, 'B1', 6),
(12, 'B2', 6);

-- --------------------------------------------------------

--
-- Structure de la table `historique_etudiant`
--

CREATE TABLE `historique_etudiant` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) DEFAULT NULL,
  `id_groupe` int(11) DEFAULT NULL,
  `annee` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `historique_etudiant`
--

INSERT INTO `historique_etudiant` (`id`, `id_etudiant`, `id_groupe`, `annee`) VALUES
(1, 1, 1, '2019/2020'),
(2, 2, 1, '2019/2020'),
(3, 3, 2, '2019/2020'),
(4, 5, 1, '2019/2020');

-- --------------------------------------------------------

--
-- Structure de la table `messegrie`
--

CREATE TABLE `messegrie` (
  `id` int(11) NOT NULL,
  `id_userEnvoye` int(11) DEFAULT NULL,
  `id_userRecepteur` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `typeMessage` varchar(255) NOT NULL DEFAULT 'text',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `statut` varchar(5) NOT NULL DEFAULT 'non'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messegrie`
--

INSERT INTO `messegrie` (`id`, `id_userEnvoye`, `id_userRecepteur`, `message`, `typeMessage`, `date`, `statut`) VALUES
(1, 3, 2, 'slam', 'text', '2020-04-08 19:33:36', 'oui'),
(2, 2, 3, 'ha ha ah', 'text', '2020-04-08 19:33:39', 'oui'),
(3, 3, 2, '9-20200408213348.jpg', 'image/jpeg', '2020-04-08 19:33:49', 'oui'),
(4, 2, 4, 'slam', 'text', '2020-04-09 14:40:56', 'oui'),
(5, 2, 4, 'hoha', 'text', '2020-04-09 14:40:56', 'oui'),
(6, 4, 2, 'ha ha ha', 'text', '2020-04-09 14:41:00', 'oui'),
(7, 4, 2, 'kach', 'text', '2020-04-09 14:41:32', 'oui'),
(8, 2, 4, 'affichage-20200409164210.html', 'text/html', '2020-04-09 14:42:11', 'oui'),
(9, 4, 2, 'slam', 'text', '2020-04-09 14:52:39', 'oui'),
(10, 2, 4, 'ha ha ha ha', 'text', '2020-04-09 14:52:43', 'non'),
(11, 2, 5, 'slam', 'text', '2020-04-09 14:58:29', 'non'),
(12, 2, 1, 'slam', 'text', '2020-04-10 11:55:17', 'non'),
(13, 2, 1, 'ha ha', 'text', '2020-04-10 12:58:08', 'non'),
(14, 3, 2, 'slam', 'text', '2020-04-28 14:21:29', 'oui'),
(15, 3, 2, 'a-20200428161919.jpg', 'image/jpeg', '2020-04-28 14:21:29', 'oui'),
(16, 2, 3, 'slam', 'text', '2020-04-28 14:22:36', 'oui'),
(17, 3, 2, 'cv ?', 'text', '2020-04-28 14:22:44', 'oui'),
(18, 2, 3, 'hmldlah', 'text', '2020-04-28 14:22:52', 'oui'),
(19, 2, 3, 'ccc', 'text', '2020-04-28 14:25:19', 'oui'),
(20, 9, 2, 'slam', 'text', '2020-05-08 15:31:54', 'oui'),
(21, 9, 1, 'slam', 'text', '2020-05-08 15:10:52', 'non'),
(22, 9, 3, 'slam', 'text', '2020-05-08 15:11:42', 'oui'),
(23, 9, 3, 'ggg', 'text', '2020-05-08 15:11:52', 'oui'),
(24, 9, 3, 'hhhh', 'text', '2020-05-08 15:12:24', 'oui'),
(25, 9, 3, 'hhhh-20200508171245.jpg', 'image/jpeg', '2020-05-08 15:12:46', 'oui'),
(26, 3, 9, 'img-20200508171325.jpg', 'image/jpeg', '2020-05-08 15:13:25', 'oui'),
(27, 9, 3, 'react-ajax-example-20200508171601.zip', 'application/zip', '2020-05-08 15:16:02', 'oui'),
(28, 9, 3, 'https://web.facebook.com/', 'line', '2020-05-08 15:16:33', 'oui'),
(29, 2, 9, 'slam', 'text', '2020-05-08 15:32:14', 'oui'),
(30, 9, 2, 'IMG-20191118-WA0040-20200508173224.jpg', 'image/jpeg', '2020-05-08 15:32:25', 'oui'),
(31, 9, 2, 'chi5 ?', 'text', '2020-05-08 15:32:36', 'oui');

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

CREATE TABLE `module` (
  `id` int(11) NOT NULL,
  `nom_module` varchar(10) NOT NULL,
  `fondamentale` varchar(10) NOT NULL DEFAULT 'non',
  `coef` varchar(10) NOT NULL,
  `semestre` int(11) NOT NULL,
  `id_specialite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `module`
--

INSERT INTO `module` (`id`, `nom_module`, `fondamentale`, `coef`, `semestre`, `id_specialite`) VALUES
(1, 'ALgo2', 'oui', '3', 1, 4),
(2, 'archi', 'non', '2', 1, 4),
(3, 'se', 'oui', '3', 1, 4),
(4, 'poo', 'oui', '3', 1, 4),
(5, 'thl', 'non', '2', 1, 4),
(6, 'bd', 'non', '2', 2, 4),
(7, 'resou', 'non', '2', 2, 4),
(8, 'gl', 'non', '2', 2, 4),
(9, 'tg', 'non', '2', 2, 4),
(10, 'ihm', 'non', '2', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `prof`
--

CREATE TABLE `prof` (
  `id` int(11) NOT NULL,
  `matricule` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `password_inscription` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `prof`
--

INSERT INTO `prof` (`id`, `matricule`, `nom`, `prenom`, `phone`, `email`, `image`, `password_inscription`) VALUES
(1, '121201', 'nassima', 'beghdaoui', '35', 'nassima09@gmail.com', '202003291424189112633.jpg', 'password'),
(2, '121202', 'abd elnour', 'beghdaoui', '24354', 'abdelnour@gmail.com', NULL, 'password'),
(3, '121203', 'amine', 'chibani', NULL, NULL, NULL, 'password'),
(4, '121204', 'kamal', 'bnstalin', NULL, NULL, NULL, 'password'),
(5, '221894333432', 'ykhelf', 'hadjer', NULL, NULL, NULL, '511589715849766');

-- --------------------------------------------------------

--
-- Structure de la table `prof_groupe`
--

CREATE TABLE `prof_groupe` (
  `id` int(11) NOT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_groupe` int(11) DEFAULT NULL,
  `id_module` int(11) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  `annee` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `prof_groupe`
--

INSERT INTO `prof_groupe` (`id`, `id_prof`, `id_groupe`, `id_module`, `role`, `annee`) VALUES
(1, 1, 1, 1, 'cour', '2019/2020'),
(2, 2, 1, 2, 'td', '2019/2020'),
(3, 1, 10, 10, 'td', '2019/2020'),
(4, 1, 8, 3, 'tp', '2019/2020');

-- --------------------------------------------------------

--
-- Structure de la table `publication_etudiant`
--

CREATE TABLE `publication_etudiant` (
  `id` int(11) NOT NULL,
  `pub` text NOT NULL,
  `augmenter` text,
  `typeAugmenter` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `publication_etudiant`
--

INSERT INTO `publication_etudiant` (`id`, `pub`, `augmenter`, `typeAugmenter`, `date`, `id_user`) VALUES
(72, 'slma cour gl', 'https://web.facebook.com/', 'line', '2020-05-08 14:55:00', 9),
(73, 'image affichage', 'IMG-20191107-WA0001-20200508165640.jpg', 'image/jpeg', '2020-05-08 14:56:40', 9),
(74, 'pdf cour se', 'Ø¹Ù„Ø§Ù…Ø§Øª Ø§Ù„Ø³Ø§Ø¹Ø©-20200508165843.pdf', 'application/pdf', '2020-05-08 14:58:43', 9),
(75, 'test', '88175487_559632604646060_6855324608271220736_n-20200508170244.png', 'image/png', '2020-05-08 15:02:44', 3),
(76, 'slam', NULL, NULL, '2020-05-08 15:23:06', 9),
(77, 'not se', 'img-20200508172626.jpg', 'image/jpeg', '2020-05-08 15:26:26', 2),
(78, 'test aba', 'IMG-20191107-WA0007-20200508172830.jpg', 'image/jpeg', '2020-05-08 15:28:30', 2);

-- --------------------------------------------------------

--
-- Structure de la table `publication_prof`
--

CREATE TABLE `publication_prof` (
  `id` int(11) NOT NULL,
  `pub` text NOT NULL,
  `augmenter` text,
  `typeAugmenter` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `publication_prof`
--

INSERT INTO `publication_prof` (`id`, `pub`, `augmenter`, `typeAugmenter`, `date`, `id_user`) VALUES
(1, 'test pub admin', NULL, NULL, '2020-04-09 15:18:33', 5);

-- --------------------------------------------------------

--
-- Structure de la table `pub_enregistrees_etudiant`
--

CREATE TABLE `pub_enregistrees_etudiant` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(11) DEFAULT NULL,
  `id_pub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pub_enregistrees_etudiant`
--

INSERT INTO `pub_enregistrees_etudiant` (`id`, `id_etudiant`, `id_pub`) VALUES
(4, 2, 73),
(5, 5, 72);

-- --------------------------------------------------------

--
-- Structure de la table `pub_enregistrees_prof`
--

CREATE TABLE `pub_enregistrees_prof` (
  `id` int(11) NOT NULL,
  `id_prof` int(11) DEFAULT NULL,
  `id_pub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `nom_sec` varchar(10) NOT NULL,
  `id_specialite` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `section`
--

INSERT INTO `section` (`id`, `nom_sec`, `id_specialite`) VALUES
(1, 'A', 4),
(2, 'B', 4),
(3, 'A', 1),
(4, 'B', 1),
(5, 'A', 2),
(6, 'B', 2);

-- --------------------------------------------------------

--
-- Structure de la table `specialite`
--

CREATE TABLE `specialite` (
  `id` int(11) NOT NULL,
  `nom_spec` varchar(50) NOT NULL,
  `annee` varchar(5) NOT NULL,
  `id_profResponsable` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`id`, `nom_spec`, `annee`, `id_profResponsable`) VALUES
(1, 'SIQ', 'L3', 1),
(2, 'isil', 'L3', 2),
(4, 'informatique', 'L2', 1),
(13, 'MI', 'L1', 4),
(14, 'MAth', 'L2', 5);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `typeUser` varchar(10) NOT NULL,
  `id_typeUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `userName`, `password`, `typeUser`, `id_typeUser`) VALUES
(1, '1616', '$2y$10$8jNrA69j5g6UvVMMhKXZpeioZV70fDWQFEtxGQf.LB8qRYTijkTj6', 'etudiant', 1),
(2, '121201', '$2y$10$StyUbHyxMesY/GR.vaQbTOwK.yD9tKl43Of5kYfBzqD2uXewRIksa', 'prof', 1),
(3, '161632030175', '$2y$10$Kjx0qL7RlbHrCCeeqhZX8OZQYp07m8K3uWReHUmzxLGAfYB3cJmVW', 'etudiant', 2),
(4, '121203', '$2y$10$43fOaKYyr5.0cKGFbMMQc.NfYZUIwSQoLtFr6rPHlE3ncxm8Q.5/i', 'prof', 2),
(5, '111101', '$2y$10$obkaz7SPBRfLyeYaU6W5WuFyjR1PaO5cGqqcIFwo6FYRiR85Feb6a', 'admin', 1),
(6, 'username', '$2y$10$kHe9I7HduyMD9IUnFeV7WuUqiOgicoGZh/xbjr8FWoGkEvWAZ2UTq', 'admin', 2),
(7, '161632030177', '$2y$10$dch5iD1OM8PVSU2KlOknT.FMIoGoNI7WAM/uphZP9hvTqZ3ZtLwSi', 'etudiant', 4),
(8, '161632030176', '$2y$10$biuC54lc8Ei/hwTec64N9O50JaCrkPiQd/VmZYMVaqm.kxIjigIku', 'etudiant', 3),
(9, 'islamab', '$2y$10$SAi.jJL.SYdEOCJ7gkFyG..LLKjSobvV0GDsG/TikdK3uVIbJ.Nom', 'etudiant', 5),
(10, 'usernameABA', '$2y$10$mZw78WaX2ywrnCWEzVf4IezKT7BhMXuiv6NJ7u/2ec6F6oygcM55a', 'etudiant', 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `affichage_groupe`
--
ALTER TABLE `affichage_groupe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_publicationEtudiant` (`id_publicationEtudiant`),
  ADD KEY `id_groupe` (`id_groupe`);

--
-- Index pour la table `departement`
--
ALTER TABLE `departement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `dette`
--
ALTER TABLE `dette`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_etudiant` (`id_etudiant`),
  ADD KEY `id_specialite` (`id_specialite`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupe` (`id_section`);

--
-- Index pour la table `historique_etudiant`
--
ALTER TABLE `historique_etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_etudiant` (`id_etudiant`),
  ADD KEY `id_groupe` (`id_groupe`);

--
-- Index pour la table `messegrie`
--
ALTER TABLE `messegrie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_userEnvoye` (`id_userEnvoye`),
  ADD KEY `id_userRecepteur` (`id_userRecepteur`);

--
-- Index pour la table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module` (`id_specialite`);

--
-- Index pour la table `prof`
--
ALTER TABLE `prof`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricule` (`matricule`);

--
-- Index pour la table `prof_groupe`
--
ALTER TABLE `prof_groupe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prof` (`id_prof`),
  ADD KEY `id_groupe` (`id_groupe`),
  ADD KEY `id_module` (`id_module`);

--
-- Index pour la table `publication_etudiant`
--
ALTER TABLE `publication_etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `publication_prof`
--
ALTER TABLE `publication_prof`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `pub_enregistrees_etudiant`
--
ALTER TABLE `pub_enregistrees_etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_etudiant` (`id_etudiant`),
  ADD KEY `id_pub` (`id_pub`);

--
-- Index pour la table `pub_enregistrees_prof`
--
ALTER TABLE `pub_enregistrees_prof`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prof` (`id_prof`),
  ADD KEY `id_publication_prof` (`id_pub`);

--
-- Index pour la table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section` (`id_specialite`);

--
-- Index pour la table `specialite`
--
ALTER TABLE `specialite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_profResponsable` (`id_profResponsable`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `affichage_groupe`
--
ALTER TABLE `affichage_groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `departement`
--
ALTER TABLE `departement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `dette`
--
ALTER TABLE `dette`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `historique_etudiant`
--
ALTER TABLE `historique_etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `messegrie`
--
ALTER TABLE `messegrie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `module`
--
ALTER TABLE `module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `prof`
--
ALTER TABLE `prof`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `prof_groupe`
--
ALTER TABLE `prof_groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `publication_etudiant`
--
ALTER TABLE `publication_etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT pour la table `publication_prof`
--
ALTER TABLE `publication_prof`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `pub_enregistrees_etudiant`
--
ALTER TABLE `pub_enregistrees_etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `pub_enregistrees_prof`
--
ALTER TABLE `pub_enregistrees_prof`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `specialite`
--
ALTER TABLE `specialite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `affichage_groupe`
--
ALTER TABLE `affichage_groupe`
  ADD CONSTRAINT `affichage_groupe_ibfk_1` FOREIGN KEY (`id_publicationEtudiant`) REFERENCES `publication_etudiant` (`id`),
  ADD CONSTRAINT `affichage_groupe_ibfk_2` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id`);

--
-- Contraintes pour la table `dette`
--
ALTER TABLE `dette`
  ADD CONSTRAINT `dette_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`),
  ADD CONSTRAINT `dette_ibfk_2` FOREIGN KEY (`id_specialite`) REFERENCES `specialite` (`id`);

--
-- Contraintes pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD CONSTRAINT `groupe` FOREIGN KEY (`id_section`) REFERENCES `section` (`id`);

--
-- Contraintes pour la table `historique_etudiant`
--
ALTER TABLE `historique_etudiant`
  ADD CONSTRAINT `historique_etudiant_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`),
  ADD CONSTRAINT `historique_etudiant_ibfk_2` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id`);

--
-- Contraintes pour la table `messegrie`
--
ALTER TABLE `messegrie`
  ADD CONSTRAINT `messegrie_ibfk_1` FOREIGN KEY (`id_userEnvoye`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `messegrie_ibfk_2` FOREIGN KEY (`id_userRecepteur`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `module`
--
ALTER TABLE `module`
  ADD CONSTRAINT `module` FOREIGN KEY (`id_specialite`) REFERENCES `specialite` (`id`);

--
-- Contraintes pour la table `prof_groupe`
--
ALTER TABLE `prof_groupe`
  ADD CONSTRAINT `prof_groupe_ibfk_1` FOREIGN KEY (`id_prof`) REFERENCES `prof` (`id`),
  ADD CONSTRAINT `prof_groupe_ibfk_2` FOREIGN KEY (`id_groupe`) REFERENCES `groupe` (`id`),
  ADD CONSTRAINT `prof_groupe_ibfk_3` FOREIGN KEY (`id_module`) REFERENCES `module` (`id`);

--
-- Contraintes pour la table `publication_etudiant`
--
ALTER TABLE `publication_etudiant`
  ADD CONSTRAINT `publication_etudiant_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `publication_prof`
--
ALTER TABLE `publication_prof`
  ADD CONSTRAINT `publication_prof_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `pub_enregistrees_etudiant`
--
ALTER TABLE `pub_enregistrees_etudiant`
  ADD CONSTRAINT `pub_enregistrees_etudiant_ibfk_1` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`),
  ADD CONSTRAINT `pub_enregistrees_etudiant_ibfk_2` FOREIGN KEY (`id_pub`) REFERENCES `publication_etudiant` (`id`);

--
-- Contraintes pour la table `pub_enregistrees_prof`
--
ALTER TABLE `pub_enregistrees_prof`
  ADD CONSTRAINT `pub_enregistrees_prof_ibfk_1` FOREIGN KEY (`id_prof`) REFERENCES `prof` (`id`),
  ADD CONSTRAINT `pub_enregistrees_prof_ibfk_2` FOREIGN KEY (`id_pub`) REFERENCES `publication_prof` (`id`);

--
-- Contraintes pour la table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section` FOREIGN KEY (`id_specialite`) REFERENCES `specialite` (`id`);

--
-- Contraintes pour la table `specialite`
--
ALTER TABLE `specialite`
  ADD CONSTRAINT `specialite_ibfk_1` FOREIGN KEY (`id_profResponsable`) REFERENCES `prof` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
