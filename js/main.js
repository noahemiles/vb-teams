angular.module('vb-teams', [])
    .controller('MainCtrl', ($scope) => {
        $scope.players = [];
        $scope.teams = [];

        $scope.newPlayer = null;
        $scope.editedPlayer = null;
        $scope.currentTeam = null;

        $scope.isCreating = false;
        $scope.isEditing = false;
        $scope.isShuffling = false;
        $scope.isEditingTeam = false;
        $scope.isInvalidTeam = false;

        const store = JSON.parse(localStorage.getItem('vbTeams'));
        if (store) {
            $scope.players = store.players;
            $scope.teams = store.teams;
        }
        setInterval(updateStorage, 1000);

        function updateStorage() {
            const vbTeams = { "players": $scope.players, "teams": $scope.teams };
            localStorage.setItem("vbTeams", JSON.stringify(vbTeams));
        }
        $scope.isCurrentTeam = function isCurrentTeam(team) {
            return $scope.currentTeam !== null && team === $scope.currentTeam;
        };

        $scope.setCurrentTeam = function setCurrentTeam(team) {
            $scope.currentTeam = team;

            $scope.cancel();
        };

        $scope.setEditedPlayer = function setEditedPlayer(player) {
            $scope.editedPlayer = angular.copy(player);
        };

        $scope.setEditedTeam = function setEditedTeam(team) {
            $scope.oldTeam = team;
        };

        $scope.isSelectedPlayer = function isSelectedPlayer(player) {
            return $scope.editedPlayer !== null && $scope.editedPlayer && $scope.editedPlayer.id === player.id;
        };

        function resetNewPlayerForm() {
            $scope.newPlayer = {
                name: "",
                gender: "",
                tall: "",
                displayName: ""
            };
        }

        $scope.playerFilter = function (player) {
            return ($scope.currentTeam == player.team || $scope.currentTeam == null);
        };

        //crud

        $scope.addTeam = function addTeam(team) {
            if (findTeamIndex(team) == -1 && team.length > 0) {
                $scope.teams.push(team);
            } else {
                $scope.isInvalidTeam = true;
            }
        };

        $scope.createPlayer = function createPlayer(player) {
            if (!player.name) return;
            if (!player.tall) {
                player.tall = false;
            }
            if (!player.gender) {
                player.gender = "n/a"
            }
            player.displayName = player.name;
            player.team = $scope.currentTeam;
            player.id = uid();
            $scope.players.push(player);
            resetNewPlayerForm();
        };
        const uid = function () {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };

        function findPlayerIndex(id) {
            let foundIndex = -1;
            for (const [index, search] of $scope.players.entries()) {
                if (search.id === id) {
                    foundIndex = index;
                    break;
                }
            }
            return foundIndex;
        }
        function findTeamIndex(teamName) {
            let foundIndex = -1;
            for (const [index, search] of $scope.teams.entries()) {
                if (search === teamName) {
                    foundIndex = index;
                    break;
                }
            }
            return foundIndex;
        }

        $scope.updatePlayer = function updatePlayer(player) {
            const index = findPlayerIndex(player.id);
            if (index > -1) {
                $scope.players[index] = player;
                $scope.editedPlayer = null;
                $scope.isEditing = false;
            }
        };

        function updatePlayerTeam(team) {
            $scope.players.forEach(player => {
                if (player.team == $scope.oldTeam || (team == null && $scope.isShuffling)) {
                    player.team = team;
                }
            });
        }

        $scope.updateTeam = function updateTeam(team) {
            const index = $scope.teams.indexOf($scope.oldTeam);
            if (index > -1) {
                updatePlayerTeam(team);
                $scope.teams[index] = team;
                $scope.editedTeam = null;
                $scope.isEditingTeam = false;
                $scope.setCurrentTeam(team);
            }
        };

        $scope.deletePlayer = function deletePlayer(player) {
            const index = findPlayerIndex(player.id);
            if (index > -1) {
                if (confirm("Delete Player?")) {
                    $scope.players.splice(index, 1);
                }
            }
        };

        $scope.deleteTeam = function deleteTeam(team) {
            const index = findTeamIndex(team);
            if (index > -1) {
                if (confirm("Delete Team?")) {
                    updatePlayerTeam(null);
                    $scope.teams.splice(index, 1);
                    $scope.setCurrentTeam(null);
                }
            }
        };

        $scope.shuffleTeams = function shuffleTeams() {
            if ($scope.teams.length > 1) {
                $scope.isShuffling = true;
                updatePlayerTeam(null);
                //shuffle teams of active players
                const activePlayers = $scope.players.filter(player => {
                    return player.active == true;
                });
                const activeCount = activePlayers.length,
                    teamCount = $scope.teams.length;
                const playersPerTeam = Math.round(activeCount / teamCount);
                if (activeCount > 1) {
                    const teamsCopy = angular.copy($scope.teams);
                    const teamPlayerCount = {};
                    teamsCopy.forEach(team => teamPlayerCount[team] = 0);
                    activePlayers.map((player, index) => {
                        let randomIndex = Math.floor(Math.random() * teamsCopy.length);
                        player.team = teamsCopy[randomIndex];
                        teamPlayerCount[teamsCopy[randomIndex]]++;
                        if (teamPlayerCount[teamsCopy[randomIndex]] >= playersPerTeam) { // check if team is maxed out on players
                            if (teamsCopy.length >= 2) {
                                teamsCopy.splice(randomIndex, 1); // remove team from pool
                            } else { // 1 team left
                                randomIndex = 0;
                            }
                        }
                    });
                }
                $scope.isShuffling = false;
            }
        };

        // creating and editing

        $scope.shouldShowCreating = function shouldShowCreating() {
            return !$scope.isEditing;
        };

        $scope.shouldShowEditing = function shouldShowEditing() {
            return $scope.isEditing && !$scope.isCreating && !$scope.isEditingTeam;
        };

        $scope.shouldShowEditingTeam = function shouldShowEditingTeam() {
            return $scope.isEditingTeam && !$scope.isCreating && !$scope.isEditing;
        };

        $scope.startCreating = function startCreating() {
            $scope.isCreating = true;
            $scope.isEditing = false;
            resetNewPlayerForm();
        };

        $scope.startEditingTeam = function startEditingTeam() {
            $scope.isEditingTeam = true;
            $scope.isCreating = false;
            $scope.isEditing = false;
        };

        $scope.startEditing = function startEditing() {
            $scope.isCreating = false;
            $scope.isEditing = true;
            $scope.isEditingTeam = false;
        };

        $scope.cancel = function cancel() {
            $scope.isEditing = false;
            $scope.isCreating = false;
            $scope.isEditingTeam = false;
            $scope.editedPlayer = null;
        };
    })

    ;